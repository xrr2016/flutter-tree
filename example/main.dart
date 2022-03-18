import 'package:flutter/material.dart';

import '../lib/flutter_tree.dart';
import './tree_data.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: const Text('Flutter Tree Demo')),
        body: TreeView(
          data: treeData,
          onTap: (d) {
            print(d);
          },
        ),
      ),
    );
  }
}
