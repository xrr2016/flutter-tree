import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_tree/flutter_tree.dart';

import '../example/tree_data.dart';

MaterialApp myApp = MaterialApp(
  home: Scaffold(
    body: TreeView(data: treeData),
  ),
);

void main() {
  testWidgets('Tree view render', (WidgetTester tester) async {
    await tester.pumpWidget(myApp);

    expect(find.byType(Icon), findsWidgets);
  });
}
