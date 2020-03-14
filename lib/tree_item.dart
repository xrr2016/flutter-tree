import 'package:flutter/material.dart';

class TreeItem {
  final String label;
  final bool expaned;
  final List<TreeItem> children;

  TreeItem({
    @required this.label,
    @required this.expaned,
    @required this.children,
  });

  factory TreeItem.fromMap(Map<String, dynamic> map) => TreeItem(
        label: map['label'],
        expaned: map['expaned'],
        children:
            (map['children'] as List).map((i) => TreeItem.fromMap(i)).toList(),
      );
}
