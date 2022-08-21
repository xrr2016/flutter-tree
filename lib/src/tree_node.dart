import 'package:flutter/material.dart';

import '../flutter_tree.dart';

class TreeNode extends StatefulWidget {
  final TreeNodeData data;
  final TreeNodeData parent;

  final bool lazy;
  final Widget icon;
  final bool showCheckBox;
  final bool showActions;
  final bool contentTappable;
  final double offsetLeft;

  final Function(TreeNodeData node) onTap;
  final void Function(bool checked, TreeNodeData node) onCheck;

  final void Function(TreeNodeData node) onExpand;
  final void Function(TreeNodeData node) onCollapse;

  final Future Function(TreeNodeData node) load;
  final void Function(TreeNodeData node) onLoad;

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
    required this.contentTappable,
    required this.icon,
    required this.lazy,
    required this.load,
    required this.append,
    required this.remove,
    required this.onTap,
    required this.onCheck,
    required this.onLoad,
    required this.onExpand,
    required this.onAppend,
    required this.onRemove,
    required this.onCollapse,
  }) : super(key: key);

  @override
  _TreeNodeState createState() => _TreeNodeState();
}

class _TreeNodeState extends State<TreeNode> with SingleTickerProviderStateMixin {
  bool _isExpanded = false;
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
        contentTappable: widget.contentTappable,
        onTap: widget.onTap,
        onCheck: widget.onCheck,
        onExpand: widget.onExpand,
        onLoad: widget.onLoad,
        onCollapse: widget.onCollapse,
        onRemove: widget.onRemove,
        onAppend: widget.onAppend,
      );
    });
  }

  @override
  initState() {
    super.initState();
    _isExpanded = widget.data.expanded;
    _isChecked = widget.data.checked;
    _rotationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    )..addStatusListener((status) {
        if (status == AnimationStatus.completed) {
          widget.onExpand(widget.data);
        } else if (status == AnimationStatus.reverse) {
          widget.onCollapse(widget.data);
        }
      });
    if (_isExpanded) {
      _rotationController.forward();
    }
  }

  @override
  Widget build(BuildContext context) {
    bool hasData = widget.data.children.isNotEmpty || (widget.lazy && !_isExpanded);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        InkWell(
          onTap: widget.contentTappable ? () {
            if (hasData) {
              widget.onTap(widget.data);
              toggleExpansion();
            } else {
              _isChecked = !_isChecked;
              widget.onCheck(_isChecked, widget.data);
              setState(() {});
            }
          } : null,
          child: Container(
            margin: const EdgeInsets.only(bottom: 2.0),
            padding: const EdgeInsets.only(right: 12.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                RotationTransition(
                  child: IconButton(
                    iconSize: 16,
                    icon: hasData ? widget.icon : Container(),
                    onPressed: hasData ? () {
                      widget.onTap(widget.data);
                      toggleExpansion();
                    } : null,
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
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 6.0),
                    child: Text(
                      widget.data.title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                if (widget.showActions)
                  TextButton(
                    onPressed: () {
                      widget.append(widget.data);
                      widget.onAppend(widget.data, widget.parent);
                    },
                    child: const Text('Add', style: TextStyle(fontSize: 12.0)),
                  ),
                if (widget.showActions)
                  TextButton(
                    onPressed: () {
                      widget.remove(widget.data);
                      widget.onRemove(widget.data, widget.parent);
                    },
                    child: const Text('Remove', style: TextStyle(fontSize: 12.0)),
                  ),
              ],
            ),
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

  void toggleExpansion() {
    if (widget.lazy && widget.data.children.isEmpty) {
      setState(() {
        _showLoading = true;
      });
      widget.load(widget.data).then((value) {
        if (value) {
          _isExpanded = true;
          _rotationController.forward();
          widget.onLoad(widget.data);
        }
        _showLoading = false;
        setState(() {});
      });
    } else {
      _isExpanded = !_isExpanded;
      if (_isExpanded) {
        _rotationController.forward();
      } else {
        _rotationController.reverse();
      }
      setState(() {});
    }
  }
}
