import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_tree/flutter_tree.dart';

MaterialApp myApp = MaterialApp(
  home: Scaffold(
    body: TreeView(
      showFilter: true,
      showActions: true,
      showCheckBox: true,
      data: [
        TreeNodeData(
          title: 'title',
          expaned: false,
          checked: false,
          children: [],
          extra: null,
        ),
      ],
    ),
  ),
);

void main() {
  testWidgets('Tree view render', (WidgetTester tester) async {
    await tester.pumpWidget(myApp);

    expect(find.byType(TreeView), findsWidgets);
  });

  testWidgets('Render filter', (WidgetTester tester) async {
    await tester.pumpWidget(myApp);

    expect(find.byType(TextField), findsWidgets);
  });

  testWidgets('Render checkbox', (WidgetTester tester) async {
    await tester.pumpWidget(myApp);

    expect(find.byType(Checkbox), findsWidgets);
  });

  testWidgets('Render actions', (WidgetTester tester) async {
    await tester.pumpWidget(myApp);

    expect(find.byType(TextButton), findsWidgets);
  });
}
