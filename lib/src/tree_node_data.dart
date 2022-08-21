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

  TreeNodeData.from(TreeNodeData other):
    this(title: other.title, expanded: other.expanded, checked: other.checked, extra: other.extra, children: other.children);
}
