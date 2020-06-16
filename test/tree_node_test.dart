import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_tree/flutter_tree.dart';

MaterialApp myApp = MaterialApp(
  home: Scaffold(
    body: TreeNode(),
  ),
);

void main() {
  testWidgets('Tree node render', (WidgetTester tester) async {
    await tester.pumpWidget(myApp);

    expect(find.byType(Icon), findsOneWidget);
  });
}
