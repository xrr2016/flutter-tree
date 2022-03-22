import 'package:flutter/material.dart';
import 'package:flutter_tree/flutter_tree.dart';

import './tree_data.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  Future<List<TreeNodeData>> _load(TreeNodeData parent) async {
    await Future.delayed(const Duration(seconds: 1));
    final data = [
      TreeNodeData(
        title: 'load1',
        expaned: false,
        checked: true,
        children: [],
        extra: null,
      ),
      TreeNodeData(
        title: 'load2',
        expaned: false,
        checked: false,
        children: [],
        extra: null,
      ),
    ];

    return data;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: const Text('Flutter Tree Example')),
        body: TreeView(
          data: treeData,
          lazy: true,
          load: _load,
          showActions: true,
          showCheckBox: true,
          showFilter: true,
          append: (parent) {
            print(parent.extra);
            return TreeNodeData(
              title: 'Appended',
              expaned: true,
              checked: true,
              children: [],
            );
          },
          onLoad: (node) {
            print('onLoad');
            print(node);
          },
          onAppend: (node, parent) {
            print('onAppend');
            print(node);
          },
          onCheck: (checked, node) {
            print('checked');
            print('onCheck');
            print(node);
          },
          onCollapse: (node) {
            print('onCollapse');
            print(node);
          },
          onExpand: (node) {
            print('onExpand');
            print(node);
          },
          onRemove: (node, parent) {
            print('onRemove');
            print(node);
          },
          onTap: (node) {
            print('onTap');
            print(node);
          },
        ),
      ),
    );
  }
}
