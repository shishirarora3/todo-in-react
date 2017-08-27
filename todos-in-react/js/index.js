'use strict';

var _class, _temp, _initialiseProps;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var animate = function animate(Target) {
  return function (_React$Component) {
    _inherits(Animate, _React$Component);

    function Animate(props) {
      _classCallCheck(this, Animate);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this.state = { className: 'animation' };
      return _this;
    }

    Animate.prototype.componentDidMount = function componentDidMount() {
      var _this2 = this;

      this.setState({
        className: 'animation'
      });
      setTimeout(function () {
        _this2.setState({
          className: 'animation mount'
        });
      }, 1000);
    };

    Animate.prototype.componentWillUnmount = function componentWillUnmount() {
      var _this3 = this;

      this.setState({
        className: 'animation unmount'
      });
      setTimeout(function () {
        _this3.setState({
          className: 'animation'
        });
      });
    };

    Animate.prototype.onClick = function onClick() {
      this.setState({
        className: 'animation click'
      });
    };

    Animate.prototype.render = function render() {
      var className = this.state.className;

      return React.createElement(Target, _extends({ onClick: this.onClick,
        className: className
      }, this.props));
    };

    return Animate;
  }(React.Component);
};

/*
 * A simple React component
 */
var _ListItem = function _ListItem(_ref) {
  var value = _ref.value;
  var done = _ref.done;
  var deleteCb = _ref.deleteCb;
  var toggleCB = _ref.toggleCB;
  var addCb = _ref.addCb;
  var updateCb = _ref.updateCb;
  var children = _ref.children;
  var className = _ref.className;
  return React.createElement(
    'div',
    { className: 'todoItem ' + className },
    React.createElement(
      'li',
      { contentEditable: true, onInput: function onInput(e) {
          updateCb(e.target.innerText);
        } },
      value
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          deleteCb();
        } },
      '-'
    ),
    React.createElement(
      'span',
      { className: done ? 'done' : 'notDone', onClick: function onClick() {
          toggleCB();
        } },
      ' '
    ),
    React.createElement(
      'button',
      { onClick: function onClick() {
          addCb();
        } },
      '+'
    ),
    children
  );
};
var ListItem = animate(_ListItem);
var Application = (_temp = _class = function (_React$Component2) {
  _inherits(Application, _React$Component2);

  function Application(props) {
    _classCallCheck(this, Application);

    var _this4 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _initialiseProps.call(_this4);

    var todos = undefined;
    try {
      todos = JSON.parse(localStorage.getItem('todos'));
    } catch (e) {
      console.error('parsing error/local storage not found', e);
    }
    todos = todos || [];
    _this4.state = {
      todos: todos
    };
    return _this4;
  }

  Application.prototype.persist = function persist() {
    var todos = this.state.todos;
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  Application.prototype.delete = function _delete(path) {
    var _this5 = this;

    var todos = this.state.todos;
    _.set(todos, path, null);
    console.log(todos);
    this.setState({
      todos: [].concat(_.compact(this.state.todos))
    }, function () {
      return _this5.persist();
    });
  };

  Application.prototype.add = function add(value) {
    var _this6 = this;

    this.setState({
      todos: [].concat(this.state.todos, [{
        index: this.state.todos.length,
        value: value,
        done: false
      }])
    }, function () {
      return _this6.persist();
    });
  };

  Application.prototype.update = function update(value, path) {
    var _this7 = this;

    console.log(value, path);
    var todos = this.state.todos;
    var todoI = _.get(todos, path);

    _.set(todos, path, {
      index: todoI.index,
      done: todoI.done,
      childTodos: todoI.childTodos,
      value: value
    });

    this.setState({
      todos: [].concat(todos)
    }, function () {
      return _this7.persist();
    });
  };

  Application.prototype.addChild = function addChild(path, childTodos, value) {
    var _this8 = this;

    var parentTodo = _.get(this.state.todos, path);
    var todo = { value: '', done: false };
    parentTodo.childTodos = [].concat(parentTodo.childTodos || [], [todo]);

    this.setState({
      todos: [].concat(this.state.todos)
    }, function () {
      return _this8.persist();
    });
  };

  Application.prototype.toggle = function toggle(path) {
    var _this9 = this;

    var todos = this.state.todos;
    var todo = _.get(todos, path);
    var modifiedTodo = _extends({}, todo, {
      done: !todo.done
    });
    _.set(todos, path, modifiedTodo);
    this.setState({
      todos: [].concat(todos)
    }, function () {
      return _this9.persist();
    });
  };

  Application.prototype.render = function render() {
    var _this10 = this;

    var _state = this.state;
    var todos = _state.todos;
    var _state$value = _state.value;
    var value = _state$value === undefined ? '' : _state$value;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'ToDos List'
      ),
      React.createElement('input', {
        type: 'text',
        value: value,
        onChange: function onChange(e) {
          _this10.setState({ value: e.target.value });
        }
      }),
      React.createElement(
        'button',
        { onClick: function onClick() {
            _this10.add(value);
          } },
        '+'
      ),
      this.renderTodos(todos)
    );
  };

  return Application;
}(React.Component), _initialiseProps = function _initialiseProps() {
  var _this11 = this;

  this.renderTodos = function (todos, ancestorPath) {
    return React.createElement(
      'ul',
      null,
      todos.map(function () {
        var todo = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var i = arguments[1];

        var childTodos = _.get(todo, 'childTodos');
        var nextAncestorPath = ancestorPath ? ancestorPath + '.childTodos[' + i + ']' : '[' + i + ']';
        return todo && React.createElement(
          ListItem,
          _extends({}, todo, {
            deleteCb: function deleteCb() {
              _this11.delete(nextAncestorPath);
            },
            toggleCB: function toggleCB() {
              _this11.toggle(nextAncestorPath);
            },
            addCb: function addCb() {
              _this11.addChild(nextAncestorPath, todo.childTodos, _this11.state.value);
            },
            updateCb: function updateCb(value) {
              _this11.update(value, nextAncestorPath);
            }

          }),
          childTodos && _this11.renderTodos(childTodos, nextAncestorPath)
        );
      })
    );
  };
}, _temp);

/*
 * Render the above component into the div#app
 */

ReactDOM.render(React.createElement(Application, null), document.getElementById('app'));