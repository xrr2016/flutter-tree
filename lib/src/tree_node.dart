import 'package:flutter/material.dart';

import '../flutter_tree.dart';

class TreeNode extends StatefulWidget {
  final TreeNodeData data;
  final TreeNodeData parent;

  final bool lazy;
  final Widget icon;
  final bool showCheckBox;
  final bool showActions;
  final double offsetLeft;

  final Function(TreeNodeData node) onTap;
  final void Function(bool checked, TreeNodeData node) onCheck;

  final void Function(TreeNodeData node) onExpand;
  final void Function(TreeNodeData node) onCollapse;

  final Future Function(TreeNodeData node) load;

  final void Function(TreeNodeData node) remove;
  final void Function(TreeNodeData node, TreeNodeData parent) onRemove;

  final void Function(TreeNodeData node) append;
  final void Function(TreeNodeData node, TreeNodeData parent) onAppend;

  const TreeNode({
    Key? key,
    required this.data,
    required this.parent,
    required this.offsetLeft,
    required this.showCheckBox,
    required this.showActions,
    required this.icon,
    required this.lazy,
    required this.load,
    required this.append,
    required this.remove,
    required this.onTap,
    required this.onCheck,
    required this.onExpand,
    required this.onAppend,
    required this.onRemove,
    required this.onCollapse,
  }) : super(key: key);

  @override
  _TreeNodeState createState() => _TreeNodeState();
}

class _TreeNodeState extends State<TreeNode>
    with SingleTickerProviderStateMixin {
  bool _isExpaned = false;
  bool _isChecked = false;
  bool _showLoading = false;
  late AnimationController _rotationController;
  final Tween<double> _turnsTween = Tween<double>(begin: -0.25, end: 0.0);

  List<TreeNode> _geneTreeNodes(List list) {
    return List.generate(list.length, (int index) {
      return TreeNode(
        data: list[index],
        parent: widget.data,
        remove: widget.remove,
        append: widget.append,
        icon: widget.icon,
        lazy: widget.lazy,
        load: widget.load,
        offsetLeft: widget.offsetLeft,
        showCheckBox: widget.showCheckBox,
        showActions: widget.showActions,
        onTap: widget.onTap,
        onCheck: widget.onCheck,
        onExpand: widget.onExpand,
        onCollapse: widget.onCollapse,
        onRemove: widget.onRemove,
        onAppend: widget.onAppend,
      );
    });
  }

  @override
  initState() {
    super.initState();
    _isExpaned = widget.data.expaned;
    _rotationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    )..addStatusListener((status) {
        if (status == AnimationStatus.completed) {
          // _showLoading = false;
        } else if (status == AnimationStatus.forward) {
          // _showLoading = true;
        } else if (status == AnimationStatus.reverse) {
          // _showLoading = false;
        }
        // setState(() {});
      });
    if (_isExpaned) {
      _rotationController.forward();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.only(left: 12.0, right: 12.0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              RotationTransition(
                child: IconButton(
                  iconSize: 16,
                  icon: widget.icon,
                  onPressed: () {
                    widget.onTap(widget.data);

                    if (widget.lazy && widget.data.children.isEmpty) {
                      setState(() {
                        _showLoading = true;
                      });
                      widget.load(widget.data).then((value) {
                        _showLoading = false;
                        _isExpaned = true;
                        _rotationController.forward();
                        widget.onExpand(widget.data);
                        setState(() {});
                      });
                    } else {
                      _isExpaned = !_isExpaned;
                      if (_isExpaned) {
                        widget.onExpand(widget.data);
                        _rotationController.forward();
                      } else {
                        widget.onCollapse(widget.data);
                        _rotationController.reverse();
                      }
                      setState(() {});
                    }
                  },
                ),
                turns: _turnsTween.animate(_rotationController),
              ),
              if (widget.showCheckBox)
                Checkbox(
                  value: _isChecked,
                  onChanged: (bool? value) {
                    _isChecked = value!;
                    widget.onCheck(_isChecked, widget.data);
                    setState(() {});
                  },
                ),
              if (widget.lazy && _showLoading)
                const SizedBox(
                  width: 12.0,
                  height: 12.0,
                  child: CircularProgressIndicator(strokeWidth: 1.0),
                ),
              const SizedBox(width: 6.0),
              Expanded(child: Text(widget.data.title)),
              const SizedBox(width: 6.0),
              ButtonBar(
                children: [
                  TextButton(
                    onPressed: () {
                      widget.append(widget.data);
                      widget.onAppend(widget.data, widget.parent);
                    },
                    child: Text(
                      '添加',
                      style: TextStyle(
                        fontSize:
                            Theme.of(context).textTheme.labelSmall?.fontSize,
                      ),
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      widget.remove(widget.data);
                      widget.onRemove(widget.data, widget.parent);
                    },
                    child: Text(
                      '删除',
                      style: TextStyle(
                        fontSize:
                            Theme.of(context).textTheme.labelSmall?.fontSize,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        SizeTransition(
          sizeFactor: _rotationController,
          child: Padding(
            padding: EdgeInsets.only(left: widget.offsetLeft),
            child: Column(children: _geneTreeNodes(widget.data.children)),
          ),
        )
      ],
    );
  }
}
