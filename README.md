# Flutter Tree

[![GitHub stars](https://img.shields.io/github/stars/xrr2016/flutter_tree)](https://github.com/xrr2016/flutter_tree/stargazers) [![pub package](https://img.shields.io/pub/v/flutter_tree.svg)](https://pub.dev/packages/flutter_tree) ![test](https://github.com/xrr2016/flutter_tree/workflows/widget%20test/badge.svg)

![example](./example/tree.gif)

## Install

```yml
dependencies:
  flutter_tree: ^1.0.0
```

## Uasge

### TreeNode

```dart
TreeNode(
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
)
```

### TreeView

```dart
TreeView(
  data: treeData,
  titleOnTap: () {
    print('title');
  },
  leadingOnTap: () {
    print('leading');
  },
  trailingOnTap: () {
    print('trailing');
  },
)
```


## Config

### TreeNode

| property | type | default | description | required |
| :- | :---: | :---: | :---: | :-: |
| level | int | `0` | Item indent level | `false` |
| expaned | boolean | `false` | Item is expaned | `false` |
| offsetLeft | double | `24.0` | Item padding left | `false` |
| children | double | `List<Widget>` | Children widget | `[]` |
| title | Widget | `Text('Title')` | Title Widget | `false`  |
| leading | Widget | `IconButton()` | Leading widget | `false` |
| trailing | Widget | `IconButton()` | Trailing widget | `false` |
| titleOnTap | Fuction | `null` | Title tap callback | `false` |
| leadingOnTap | Fuction | `null` | Leading tap callback | `false` |
| trailingOnTap | Fuction | `null` | Trailing tap Callback | `false` |


### TreeView

| property | type | default | description | required |
| :- | :---: | :---: | :---: | :-: |
| data | List<Map<String, dynamic>> | `null` | Tree data | `true` |
| titleKey | string | `title` | Title key in map | `false` |
| leadingKey | string | `leading` | Leading key in map | `false` |
| expanedKey | string | `expaned` | Expaned key in map | `false` |
| childrenKey | string | `children` | Children key in map | `false` |
| offsetLeft | double | `24.0` | Item padding left | `false` |
| titleOnTap | Fuction | `null` | Title tap callback | `false` |
| leadingOnTap | Fuction | `null` | Leading tap callback | `false` |
| trailingOnTap | Fuction | `null` | Trailing tap Callback | `false` |



## Contribute

1. Fork it (https://github.com/xrr2016/flutter_tree.git)
2. Create your feature branch (git checkout -b feature/foo)
3. Commit your changes (git commit -am 'Add some foo')
4. Push to the branch (git push origin feature/foo)
5. Create a new Pull Request

## License

[MIT](./LICENSE)

