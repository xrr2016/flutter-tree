import 'package:flutter/material.dart';

import './tree_node_data.dart';

class TreeNode extends StatefulWidget {
  final TreeNodeData nodeData;

  const TreeNode({
    Key? key,
    required this.nodeData,
  }) : super(key: key);

  @override
  _TreeNodeState createState() => _TreeNodeState();
}

class _TreeNodeState extends State<TreeNode>
    with SingleTickerProviderStateMixin {
  bool _isExpaned = false;
  bool _isChecked = false;
  late AnimationController _rotationController;
  final Tween<double> _turnsTween = Tween<double>(begin: 0.0, end: -0.25);

  List<TreeNode> _geneTreeNodes(List list) {
    return List.generate(list.length, (int index) {
      return TreeNode(nodeData: list[index]);
    });
  }

  @override
  initState() {
    super.initState();
    _isExpaned = widget.nodeData.expaned!;
    _rotationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
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
                  // splashRadius: 10.0,
                  constraints: BoxConstraints(
                    minHeight: 20.0,
                    minWidth: 20.0,
                  ),
                  icon: widget.nodeData.icon!,
                  padding: const EdgeInsets.all(0.0),
                  iconSize: 16,
                  onPressed: () {
                    widget.nodeData.onTap!(widget.nodeData);
                    setState(() {
                      _isExpaned = !_isExpaned;
                      if (_isExpaned) {
                        _rotationController.forward();
                      } else {
                        _rotationController.reverse();
                      }
                    });
                  },
                ),
                turns: _turnsTween.animate(_rotationController),
              ),
              Checkbox(
                checkColor: Colors.white,
                value: _isChecked,
                onChanged: (bool? value) {
                  setState(() {
                    _isChecked = value!;
                  });
                },
              ),
              Expanded(
                child: GestureDetector(
                  onTap: () {
                    if (widget.nodeData.onTap != null &&
                        widget.nodeData.onTap is Function) {
                      widget.nodeData.onTap!(widget.nodeData);
                    }
                  },
                  child: widget.nodeData.title != null
                      ? Container(
                          color: Colors.amber,
                          child: Text(widget.nodeData.title!),
                        )
                      : const SizedBox.shrink(),
                ),
              ),
              const SizedBox(width: 6.0),
              widget.nodeData.trailing!,
            ],
          ),
        ),
        Visibility(
          visible: widget.nodeData.children!.isNotEmpty && _isExpaned,
          child: Padding(
            padding: EdgeInsets.only(
              left: (widget.nodeData.level! + 1) * widget.nodeData.offset!,
            ),
            child: Column(children: _geneTreeNodes(widget.nodeData.children!)),
          ),
        ),
      ],
    );
  }
}
