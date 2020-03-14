import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_tree/tree_item.dart';
import 'package:flutter_tree/tree_node.dart';

MaterialApp myApp = MaterialApp(
  home: Scaffold(
    body: TreeNode(
      item: TreeItem(
        label: 'label',
        expaned: true,
        children: [],
      ),
    ),
  ),
);

void main() {
  testWidgets('Tree node render', (WidgetTester tester) async {
    await tester.pumpWidget(myApp);

    expect(find.text('label'), findsOneWidget);
    expect(find.byType(Icon), findsOneWidget);
  });
}
