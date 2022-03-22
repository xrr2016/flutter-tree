import 'package:flutter_tree/flutter_tree.dart';

// ignore: avoid_relative_lib_imports

var serverData = [
  {
    "checked": true,
    "children": [],
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

class MyServerData {
  MyServerData({
    required this.checked,
    required this.children,
    required this.id,
    required this.pid,
    required this.show,
    required this.text,
  });

  bool checked;
  int id;
  int pid;
  bool show;
  String text;
  List<MyServerData> children;

  factory MyServerData.fromJson(Map<String, dynamic> json) => MyServerData(
        checked: json["checked"],
        children: List<MyServerData>.from(
          json["children"].map((x) => MyServerData.fromJson(x)),
        ),
        id: json["id"],
        pid: json["pid"],
        show: json["show"],
        text: json["text"],
      );
}

TreeNodeData mapServerDataToTreeNodeData(MyServerData data) {
  return TreeNodeData(
    extra: data,
    title: data.text,
    expaned: data.show,
    checked: data.checked,
    children:
        List.from(data.children.map((x) => mapServerDataToTreeNodeData(x))),
  );
}

List<TreeNodeData> treeData = List.generate(
  serverData.length,
  (index) => mapServerDataToTreeNodeData(
    MyServerData.fromJson(serverData[index]),
  ),
);
