import 'package:flutter/material.dart';
import 'package:flutter_tree/flutter_tree.dart';

import 'tree_data.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tree example',
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(title: Text('Flutter Tree')),
        // body: TreeView(
        //   data: treeData,
        //   titleOnTap: () {
        //     print('title');
        //   },
        //   leadingOnTap: () {
        //     print('leading');
        //   },
        //   trailingOnTap: () {
        //     print('trailing');
        //   },
        // ),

        body: TreeNode(
          title: Text('This is a title!'),
          children: [
            TreeNode(
              title: Text('This is a title!'),
              children: <Widget>[
                TreeNode(title: Text('This is a title!')),
                TreeNode(
                  title: Text('This is a title!'),
                  children: <Widget>[
                    TreeNode(title: Text('This is a title!')),
                    TreeNode(title: Text('This is a title!')),
                    TreeNode(title: Text('This is a title!')),
                  ],
                ),
                TreeNode(title: Text('This is a title!')),
                TreeNode(title: Text('This is a title!')),
                TreeNode(
                  title: Text('This is a title!'),
                  children: <Widget>[
                    TreeNode(title: Text('This is a title!')),
                    TreeNode(title: Text('This is a title!')),
                    TreeNode(title: Text('This is a title!')),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
