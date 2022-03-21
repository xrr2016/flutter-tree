import 'package:flutter/material.dart';

import '../flutter_tree.dart';

class TreeNode extends StatefulWidget {
  final TreeNodeData data;
  final TreeNodeData parent;
  final bool? lazy;
  final Widget? icon;
  final bool? showCheckBox;
  final double? offsetLeft;

  final Function(TreeNodeData node)? onTap;
  final void Function(bool checked, TreeNodeData node)? onCheck;

  final void Function(TreeNodeData node)? onExpand;
  final void Function(TreeNodeData node)? onCollapse;

  final List<TreeNodeData> Function(TreeNodeData node)? load;

  final void Function(TreeNodeData node) remove;
  final void Function(TreeNodeData node, TreeNodeData parent)? onRemove;

  final TreeNodeData Function()? onAppend;
  final void Function(TreeNodeData node, List<TreeNodeData> children) append;

  const TreeNode({
    Key? key,
    required this.data,
    required this.parent,
    required this.remove,
    required this.append,
    this.onTap,
    this.onCheck,
    this.onExpand,
    this.onAppend,
    this.onRemove,
    this.onCollapse,
    this.offsetLeft,
    this.showCheckBox,
    this.icon,
    this.lazy,
    this.load,
  }) : super(key: key);

  @override
  _TreeNodeState createState() => _TreeNodeState();
}

class _TreeNodeState extends State<TreeNode>
    with SingleTickerProviderStateMixin {
  bool _isExpaned = false;
  bool _isChecked = false;
  late AnimationController _rotationController;
  final Tween<double> _turnsTween = Tween<double>(begin: -0.25, end: 0.0);

  List<TreeNode> _geneTreeNodes(List list) {
    return List.generate(list.length, (int index) {
      return TreeNode(
        data: list[index],
        remove: widget.remove,
        append: widget.append,
        parent: widget.data,
        icon: widget.icon,
        lazy: widget.lazy,
        load: widget.load,
        offsetLeft: widget.offsetLeft,
        showCheckBox: widget.showCheckBox,
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
    );
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
              if (widget.data.children.isNotEmpty)
                RotationTransition(
                  child: IconButton(
                    iconSize: 16,
                    icon: widget.icon!,
                    onPressed: () {
                      widget.onTap!(widget.data);
                      setState(() {
                        _isExpaned = !_isExpaned;
                        if (_isExpaned) {
                          widget.onExpand!(widget.data);
                          _rotationController.forward();
                        } else {
                          widget.onCollapse!(widget.data);
                          _rotationController.reverse();
                        }
                      });
                    },
                  ),
                  turns: _turnsTween.animate(_rotationController),
                )
              else
                const SizedBox(width: 40.0),
              if (widget.showCheckBox!)
                Checkbox(
                  value: _isChecked,
                  checkColor: Colors.white,
                  onChanged: (bool? value) {
                    setState(() {
                      _isChecked = value!;
                      widget.onCheck!(_isChecked, widget.data);
                    });
                  },
                ),
              Expanded(child: Text(widget.data.title)),
              const SizedBox(width: 6.0),
              TextButton(
                onPressed: () {
                  widget.append(widget.onAppend!(), widget.data.children);
                },
                child: Text(
                  '添加',
                  style: TextStyle(
                    fontSize: Theme.of(context).textTheme.labelSmall?.fontSize,
                  ),
                ),
              ),
              TextButton(
                onPressed: () {
                  widget.remove(widget.data);
                  widget.onRemove!(widget.data, widget.parent);
                },
                child: Text(
                  '删除',
                  style: TextStyle(
                    fontSize: Theme.of(context).textTheme.labelSmall?.fontSize,
                  ),
                ),
              ),
            ],
          ),
        ),
        SizeTransition(
          sizeFactor: _rotationController,
          child: Padding(
            padding: EdgeInsets.only(
              left: widget.offsetLeft!,
            ),
            child: Column(children: _geneTreeNodes(widget.data.children)),
          ),
        )
      ],
    );
  }
}
