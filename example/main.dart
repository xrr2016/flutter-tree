import 'package:flutter/material.dart';
import 'package:flutter_tree/tree_view.dart';

import 'items_data.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tree example',
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: Text('Flutter tree example')),
        body: TreeView(
          data: itemsData,
          offsetLeft: 32.0,
          leading: IconButton(
            icon: Icon(Icons.menu),
            onPressed: () {
              print('leading');
            },
          ),
          expanedIcon: Icon(Icons.add),
          labelOnTap: () {
            print('label');
          },
        ),
      ),
    );
  }
}
