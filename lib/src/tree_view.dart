import 'package:flutter/material.dart';

import './tree_node.dart';
import './tree_node_data.dart';

class TreeView extends StatelessWidget {
  final List<TreeNodeData> data;

  final Widget? icon;
  final Function? onTap;
  final double? offsetLeft;

  const TreeView({
    Key? key,
    required this.data,
    this.onTap,
    this.icon,
    this.offsetLeft = 20.0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: List.generate(data.length, (int index) {
          return TreeNode(nodeData: data[index]);
        }),
      ),
    );
  }
}
