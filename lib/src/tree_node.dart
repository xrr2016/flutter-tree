import 'package:flutter/material.dart';

import './tree_node_data.dart';

class TreeNode extends StatefulWidget {
  final TreeNodeData data;

  final Widget? icon;
  final Function? onTap;
  final double? offsetLeft;
  final bool? showCheckBox;

  const TreeNode({
    Key? key,
    required this.data,
    this.onTap,
    this.offsetLeft = 20.0,
    this.showCheckBox = false,
    this.icon = const Icon(Icons.expand_more, size: 20.0),
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
      return TreeNode(data: list[index]);
    });
  }

  @override
  initState() {
    super.initState();
    _isExpaned = widget.data.expaned!;
    _rotationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onVerticalDragStart: (details) {
        print(details);
      },
      onVerticalDragUpdate: (details) {},
      onVerticalDragEnd: (details) {},
      onVerticalDragCancel: () {},
      onVerticalDragDown: (details) {},
      child: Column(
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
                    // constraints: BoxConstraints(
                    //   maxHeight: 20.0,
                    //   maxWidth: 20.0,
                    //   minHeight: 20.0,
                    //   minWidth: 20.0,
                    // ),
                    icon: widget.data.icon!,
                    padding: const EdgeInsets.all(0.0),
                    iconSize: 16,
                    onPressed: () {
                      widget.data.onTap!(widget.data);
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
                if (widget.showCheckBox!)
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
                      if (widget.data.onTap != null &&
                          widget.data.onTap is Function) {
                        widget.data.onTap!(widget.data);
                      }
                    },
                    child: widget.data.title != null
                        ? Container(
                            color: Colors.amber,
                            child: Text(widget.data.title!),
                          )
                        : const SizedBox.shrink(),
                  ),
                ),
                const SizedBox(width: 6.0),
                widget.data.trailing!,
              ],
            ),
          ),
          Visibility(
            visible: widget.data.children!.isNotEmpty && _isExpaned,
            child: Padding(
              padding: EdgeInsets.only(
                left: (widget.data.level! + 1) * widget.data.offset!,
              ),
              child: Column(children: _geneTreeNodes(widget.data.children!)),
            ),
          ),
        ],
      ),
    );
  }
}
