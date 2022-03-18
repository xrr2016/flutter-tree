import 'package:flutter/material.dart';

import './tree_node.dart';
import './tree_node_data.dart';

class TreeView extends StatelessWidget {
  final List<TreeNodeData> data;

  final Widget? icon;
  final Function(TreeNodeData data)? onTap;
  final Function()? filter;
  final Function()? load;
  final Function()? expand;
  final Function()? collapse;
  final Function()? onCheck;
  final double? offsetLeft;
  final bool? showCheckBox;
  final bool? draggable;
  final bool? lazy;

  const TreeView({
    Key? key,
    required this.data,
    this.onTap,
    this.filter,
    this.expand,
    this.collapse,
    this.onCheck,
    this.load,
    this.offsetLeft = 20.0,
    this.lazy = false,
    this.draggable = false,
    this.showCheckBox = false,
    this.icon = const Icon(Icons.expand_more, size: 20.0),
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 24.0, right: 24.0),
            child: TextField(
              controller: TextEditingController(),
            ),
          ),
          ...List.generate(data.length, (int index) {
            return TreeNode(data: data[index]);
          })
        ],
      ),
    );
  }
}
