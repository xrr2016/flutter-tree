import 'package:flutter/material.dart';
import 'package:flutter_tree/tree_item.dart';

class TreeNode extends StatefulWidget {
  final TreeItem item;
  final int level;

  final Widget leading;
  final double offsetLeft;
  final Widget expanedIcon;

  final Function labelOnTap;
  final Function leadingOnTap;

  const TreeNode({
    @required this.item,
    this.level = 0,
    this.leading = const IconButton(icon: Icon(Icons.list), onPressed: null),
    this.labelOnTap,
    this.leadingOnTap,
    this.offsetLeft = 24.0,
    this.expanedIcon = const Icon(Icons.expand_more),
  })  : assert(item != null),
        assert(leading != null && leadingOnTap == null);

  @override
  _TreeNodeState createState() => _TreeNodeState();
}

class _TreeNodeState extends State<TreeNode>
    with SingleTickerProviderStateMixin {
  bool _isExpaned = false;

  AnimationController _rotationController;
  final Tween<double> _turnsTween = Tween<double>(begin: 0.0, end: -0.5);

  initState() {
    _isExpaned = widget.item.expaned;
    _rotationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final TreeItem item = widget.item;
    final int level = widget.level;
    final Widget leading = widget.leading;
    final double offsetLeft = widget.offsetLeft;
    final List<TreeItem> children = item.children;
    final Widget expanedIcon = widget.expanedIcon;

    final Function labelOnTap = widget.labelOnTap;
    final Function leadingOnTap = widget.leadingOnTap;

    return Column(
      children: <Widget>[
        Row(
          children: <Widget>[
            if (leading != null)
              leading
            else
              IconButton(
                icon: Icon(Icons.list),
                onPressed: leadingOnTap,
              ),
            Expanded(
              child: InkWell(
                onTap: labelOnTap,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(
                    item.label,
                    maxLines: 1,
                    overflow: TextOverflow.clip,
                  ),
                ),
              ),
            ),
            Visibility(
              visible: children.length > 0,
              child: IconButton(
                onPressed: () {
                  setState(() {
                    _isExpaned = !_isExpaned;
                    if (_isExpaned) {
                      _rotationController.forward();
                    } else {
                      _rotationController.reverse();
                    }
                  });
                },
                icon: RotationTransition(
                  child: expanedIcon,
                  turns: _turnsTween.animate(_rotationController),
                ),
              ),
            ),
          ],
        ),
        Visibility(
          visible: children.length > 0 && _isExpaned,
          child: Padding(
            padding: EdgeInsets.only(left: level + 1 * offsetLeft),
            child: Column(
              children: List.generate(children.length, (int index) {
                return TreeNode(
                  item: children[index],
                  leading: leading,
                  offsetLeft: offsetLeft,
                  expanedIcon: expanedIcon,
                );
              }),
            ),
          ),
        ),
      ],
    );
  }
}
