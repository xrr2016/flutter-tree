import 'package:flutter_tree/flutter_tree.dart';

/// Your server data
final serverData = [
  {
    "checked": true,
    "children": [
      {
        "checked": true,
        "show": false,
        "children": [],
        "id": 11,
        "pid": 1,
        "text": "零售业务线11",
      },
    ],
    "id": 1,
    "pid": 0,
    "show": false,
    "text": "零售业务线1",
  },
  {
    "checked": true,
    "show": false,
    "children": [],
    "id": 2,
    "pid": 0,
    "text": "零售业务线2",
  },
  {
    "checked": true,
    "children": [],
    "id": 3,
    "pid": 0,
    "show": false,
    "text": "零售业务线3",
  },
];

/// Map server data to tree node data
TreeNodeData mapServerDataToTreeData(Map data) {
  return TreeNodeData(
    extra: data,
    title: data['text'],
    expaned: data['show'],
    checked: data['checked'],
    children:
        List.from(data['children'].map((x) => mapServerDataToTreeData(x))),
  );
}

/// Generate tree data
List<TreeNodeData> treeData = List.generate(
  serverData.length,
  (index) => mapServerDataToTreeData(serverData[index]),
).toList();
