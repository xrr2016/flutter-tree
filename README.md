# flutter_tree

[![GitHub stars](https://img.shields.io/github/stars/xrr2016/flutter_tree)](https://github.com/xrr2016/flutter_tree/stargazers)

[![pub package](https://img.shields.io/badge/pub-v0.1.0-blue)](https://pub.dev/packages/flutter_tree)

Flutter tree widget

## Example

![example](./example/tree.gif)

## Install

```sh
flutter_tree: ^0.1.0
```

## Uasge

```dart
final List<Map<String, dynamic>> data = [
  {
    "label": "level01",
    "expaned": true,
    "children": [
       {
        "label": "level02",
        "expaned": true,
        "children": []
      }
    ]
  }
]

TreeView(data: data),
```

## Config



## Contribute

1. Fork it (https://github.com/xrr2016/flutter_tree.git)
2. Create your feature branch (git checkout -b feature/foo)
3. Commit your changes (git commit -am 'Add some foo')
4. Push to the branch (git push origin feature/foo)
5. Create a new Pull Request

## License

[MIT](./LICENSE)

