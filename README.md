# Flutter Tree

[![GitHub stars](https://img.shields.io/github/stars/xrr2016/flutter_tree)](https://github.com/xrr2016/flutter_tree/stargazers) [![pub package](https://img.shields.io/pub/v/flutter_tree.svg)](https://pub.dev/packages/flutter_tree) ![test](https://github.com/xrr2016/flutter_tree/workflows/widget%20test/badge.svg)


[Version1](./readme.v1.md)
## Install

```yml
dependencies:
  flutter_tree: ^2.0.0
```

## Uasge

### Basic

### Filter

### Checked

### Events

### Actions

### Lazy load




## Props

| property     |                        type                         |       default       |        description        | required |
| :----------- | :-------------------------------------------------: | :-----------------: | :-----------------------: | :------: |
| data         |                `List<TreeNodeData>`                 |        `[]`         |         Tree data         |  `true`  |
| lazy         |                       `bool`                        |       `false`       |    Lazy load node data    | `false`  |
| icon         |                      `Widget`                       | `Icons.expand_more` |         Tree icon         | `false`  |
| offsetLeft   |                      `double`                       |       `24.0`        |     Item padding left     | `false`  |
| showFilter   |                       `bool`                        |       `false`       |     Show tree filter      | `false`  |
| showActions  |                       `bool`                        |       `false`       |     Show node actions     | `false`  |
| showCheckBox |                       `bool`                        |       `false`       |    Show node checkbox     | `false`  |
| onTap        |              `Function(TreeNodeData)`               |       `null`        |     Node tap callback     | `false`  |
| onExpand     |              `Function(TreeNodeData)`               |       `null`        |   Node expaned callback   | `false`  |
| onCollapse   |              `Function(TreeNodeData)`               |       `null`        |  Node collapse callback   | `false`  |
| onCheck      |           `Function(bool, TreeNodeData)`            |       `null`        |    Node check callback    | `false`  |
| onAppend     |       `Function(TreeNodeData, TreeNodeData)`        |       `null`        |   Node append callback    | `false`  |
| onRemove     |       `Function(TreeNodeData, TreeNodeData)`        |       `null`        |   Node remove callback    | `false`  |
| append       |              `Function(TreeNodeData)`               |       `null`        | Append node data function | `false`  |
| load         | `Future<List<TreeNodeData>> Function(TreeNodeData)` |       `null`        |  Load node data function  | `false`  |

## Contribute

1. Fork it (https://github.com/xrr2016/flutter_tree.git)
2. Create your feature branch (git checkout -b feature/foo)
3. Commit your changes (git commit -am 'Add some foo')
4. Push to the branch (git push origin feature/foo)
5. Create a new Pull Request

## License

[MIT](./LICENSE)

