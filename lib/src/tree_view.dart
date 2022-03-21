import 'package:flutter/material.dart';

import './tree_node.dart';
import './tree_node_data.dart';

class TreeView extends StatefulWidget {
  final List<TreeNodeData> data;

  final bool lazy;
  final Widget icon;
  final bool showFilter;
  final bool showCheckBox;
  final double offsetLeft;

  final Function(TreeNodeData node)? onTap;
  final void Function(TreeNodeData node)? onExpand;
  final void Function(TreeNodeData node)? onCollapse;
  final TreeNodeData Function(TreeNodeData parent)? append;
  final void Function(bool checked, TreeNodeData node)? onCheck;
  final Future<List<TreeNodeData>> Function(TreeNodeData node)? load;
  final void Function(TreeNodeData node, TreeNodeData parent)? onAppend;
  final void Function(TreeNodeData node, TreeNodeData parent)? onRemove;

  const TreeView({
    Key? key,
    required this.data,
    this.onTap,
    this.onCheck,
    this.onExpand,
    this.onCollapse,
    this.onAppend,
    this.onRemove,
    this.append,
    this.load,
    this.lazy = false,
    this.offsetLeft = 24.0,
    this.showCheckBox = false,
    this.showFilter = false,
    this.icon = const Icon(Icons.expand_more, size: 16.0),
  }) : super(key: key);

  @override
  State<TreeView> createState() => _TreeViewState();
}

class _TreeViewState extends State<TreeView> {
  late TreeNodeData _root;
  List<TreeNodeData> _renderList = [];

  void _filterRenderList(String val) {
    if (val.isNotEmpty) {
      List<TreeNodeData> list = [];
      for (var i = 0; i < widget.data.length; i++) {
        if (widget.data[i].title.contains(val)) {
          list.add(widget.data[i]);
        }
      }
      _renderList = list;
    } else {
      _renderList = widget.data;
    }
    setState(() {});
  }

  void append(TreeNodeData parent) {
    parent.children.add(widget.append!(parent));
    setState(() {});
  }

  void _remove(TreeNodeData node, List<TreeNodeData> list) {
    for (int i = 0; i < list.length; i++) {
      if (node == list[i]) {
        list.removeAt(i);
      } else {
        _remove(node, list[i].children);
      }
    }
  }

  void remove(TreeNodeData node) {
    _remove(node, _renderList);
    setState(() {});
  }

  Future load(TreeNodeData node) async {
    final data = await widget.load!(node);
    node.children = data;
    setState(() {});
    return true;
  }

  @override
  void initState() {
    super.initState();
    _renderList = widget.data;
    _root = TreeNodeData(
      title: '',
      extra: null,
      checked: false,
      expaned: false,
      children: _renderList,
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          if (widget.showFilter)
            Padding(
              padding: const EdgeInsets.only(left: 24.0, right: 24.0),
              child: TextField(onChanged: _filterRenderList),
            ),
          ...List.generate(_renderList.length, (int index) {
            return TreeNode(
              parent: _root,
              data: _renderList[index],
              icon: widget.icon,
              lazy: widget.lazy,
              offsetLeft: widget.offsetLeft,
              onCollapse: widget.onCollapse,
              showCheckBox: widget.showCheckBox,
              onTap: widget.onTap,
              onCheck: widget.onCheck,
              onExpand: widget.onExpand,
              onRemove: widget.onRemove,
              onAppend: widget.onAppend,
              load: load,
              remove: remove,
              append: append,
            );
          })
        ],
      ),
    );
  }
}
