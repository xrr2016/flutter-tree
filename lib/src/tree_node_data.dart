import 'package:flutter/material.dart';

class TreeNodeData {
  int? level;
  double? offset;
  Widget? icon;
  Widget? trailing;
  String? title;
  bool? expaned;
  dynamic extra;
  List<TreeNodeData>? children;
  Function(TreeNodeData)? onTap;

  TreeNodeData({
    this.onTap,
    this.title,
    this.offset,
    this.level,
    this.expaned,
    this.children,
    this.icon,
    this.trailing,
    this.extra,
  });
}
