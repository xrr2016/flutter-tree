import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_tree/tree_view.dart';

final List<Map<String, dynamic>> testData = [
  {
    "label": "item01",
    "expaned": true,
    "children": [],
  },
  {
    "label": "item02",
    "expaned": true,
    "children": [],
  },
  {
    "label": "item03",
    "expaned": true,
    "children": [],
  },
  {
    "label": "item04",
    "expaned": true,
    "children": [],
  },
  {
    "label": "label",
    "expaned": true,
    "children": [],
  },
];

MaterialApp myApp = MaterialApp(
  home: Scaffold(
    body: TreeView(data: testData),
  ),
);

void main() {
  testWidgets('Tree view render', (WidgetTester tester) async {
    await tester.pumpWidget(myApp);

    expect(find.text('label'), findsOneWidget);
    expect(find.text('item01'), findsOneWidget);
    expect(find.byType(Icon), findsWidgets);
  });
}
