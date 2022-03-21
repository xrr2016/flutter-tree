import 'package:flutter/material.dart';

class TreeNodeData {
  String title;
  bool expaned;
  List<TreeNodeData> children;
  dynamic extra;
  UniqueKey? key;

  TreeNodeData({
    required this.title,
    required this.expaned,
    required this.children,
    this.key,
    this.extra,
  }) {
    key = UniqueKey();
  }
}
