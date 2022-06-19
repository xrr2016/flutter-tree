class TreeNodeData {
  String title;
  bool expanded;
  bool checked;
  dynamic extra;
  List<TreeNodeData> children;

  TreeNodeData({
    required this.title,
    required this.expanded,
    required this.checked,
    required this.children,
    this.extra,
  });
}
