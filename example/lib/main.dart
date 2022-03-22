import 'package:flutter/material.dart';
import 'package:flutter_tree/flutter_tree.dart';

import './tree_data.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  Future<List<TreeNodeData>> _load(TreeNodeData d) async {
    await Future.delayed(Duration(seconds: 2));
    final data = [
      TreeNodeData(
        title: 'load1',
        expaned: false,
        checked: false,
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
      TreeNodeData(
        title: 'load3',
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
        appBar: AppBar(title: const Text('Flutter Tree Demo')),
        body: TreeView(
          data: treeData,
          showFilter: true,
          showCheckBox: true,
          // lazy: true,
          load: _load,
          // icon: Icon(Icons.folder_outlined),
          onTap: (d) {},
          onExpand: (d) {},
          onCollapse: (d) {},
          onRemove: (d, p) {},
          append: (TreeNodeData p) {
            return TreeNodeData(
              title: 'append',
              checked: false,
              expaned: false,
              children: [],
            );
          },
          onAppend: (n, p) {},
          onCheck: (bool val, d) {},
        ),
      ),
    );
  }
}
