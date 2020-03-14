import 'package:flutter/material.dart';
import 'package:flutter_tree/tree_item.dart';
import 'package:flutter_tree/tree_node.dart';

class TreeView extends StatelessWidget {
  final List<Map<String, dynamic>> data;

  final String labelKey;
  final String expanedKey;
  final String childrenKey;

  final Widget leading;
  final double offsetLeft;
  final Widget expanedIcon;

  final Function labelOnTap;
  final Function leadingOnTap;

  const TreeView({
    @required this.data,
    this.leading = const IconButton(icon: Icon(Icons.list), onPressed: null),
    this.labelOnTap,
    this.leadingOnTap,
    this.labelKey = 'label',
    this.expanedKey = 'expaned',
    this.childrenKey = 'children',
    this.expanedIcon = const Icon(Icons.expand_more),
    this.offsetLeft = 24.0,
  })  : assert(data != null),
        assert(leading != null && leadingOnTap == null);

  TreeItem _itemFromMap(Map<String, dynamic> map) => TreeItem(
        label: map[labelKey],
        expaned: map[expanedKey],
        children:
            (map[childrenKey] as List).map((i) => _itemFromMap(i)).toList(),
      );

  @override
  Widget build(BuildContext context) {
    final List<TreeItem> items = data.map((d) => _itemFromMap(d)).toList();

    return ListView(
      children: List.generate(items.length, (int index) {
        return TreeNode(
          item: items[index],
          level: 0,
          leading: leading,
          labelOnTap: labelOnTap,
          leadingOnTap: leadingOnTap,
          offsetLeft: offsetLeft,
          expanedIcon: expanedIcon,
        );
      }),
    );
  }
}
