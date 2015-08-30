/**
 * @jsx react.DOM
 */
/**
 * Positive number type
 * Email type
 * Date type
 */
var React = require('react');
var t = require('tcomb-form');
var DateTimePicker = require('react-widgets/lib/DateTimePicker');

var Form = t.form.Form;

var aumTcomb = {};
aumTcomb.types = {};
aumTcomb.form = {};

var Positive = t.subtype(t.Num, function (n) {
  return n >= 0;
}, 'Positive');

aumTcomb.types.Positive = Positive;

var emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

var Email = t.subtype(t.Str, function (address) {
  //return mailRegex.test(address);
  return emailCheck.test(address);
}, 'Email');

aumTcomb.types.Email = Email;

/**
 * date custom template
 */
function dateTemplate(locals) {

  var formGroupClasses = {
    'form-group': true,
    'has-feedback': true,
    'has-error': locals.hasError
  };

  // config contains your new params
  var config = locals.config || {};
  var style = {
    color: config.color,
    backgroundColor: config.backgroundColor
  };
  var hasErrorClass = (locals.hasError)?"has-error":"";
  return (
    <div className="dateTimePicker-form-group form-group">
      {/* add a label if specified */}
      {locals.label ? <label className="control-label">{locals.label}</label> : null}
      <DateTimePicker 
        defaultValue={locals.value}
        format="dd.MM.yyyy"
        time={false}
        onChange={function (currDate, currDateStr) {
          locals.onChange(currDate, currDateStr);
        }}
        name={locals.name}
        style={style}
        className={hasErrorClass}
        disabled={locals.disabled}
        min={new Date()} 
        headerFormat={"MM/yyyy"}
        footer={false} />

      {/* add an error if specified */}
      {locals.error ? <span className="help-block error-block">{locals.error}</span> : null}

      {/* add a help if specified */}
      {locals.help ? <span className="help-block">{locals.help}</span> : null}
    </div>
  );
}

var DateComponent = React.createClass({

  getInitialState: function () {
    return {
      hasError: false,
      value: this.props.value
    };
  },

  componentWillReceiveProps: function (props) {
    this.setState({value: props.value});
  },

  // aggressive optimization (optional)
  /*shouldComponentUpdate: function (nextProps, nextState) {
    return nextState.value !== this.state.value ||
      nextState.hasError !== this.state.hasError ||
      nextProps.value !== this.props.value ||
      nextProps.options !== this.props.options ||
      nextProps.props.type !== this.props.type ||
      nextProps.onChange !== this.props.onChange;
  },*/

  onChange: function (currDate, currDateStr) {
    this.setState({value: currDate}, function () {
      this.props.onChange(currDate);
    }.bind(this));
  },

  validate: function() {
    var value = this.state.value;
    var result = t.validate(value, this.props.type);
    this.setState({hasError: !result.isValid()});
    return result;
  },

  getValue: function () {
    var result = this.validate();
    return result;
  },

  render: function () {
    var opts = this.props.options || {};
    var ctx = this.props.ctx;

    // handling label
    var label = opts.label;
    if (!label && ctx.auto === 'labels') {
      // if labels are auto generated, get the default label
      label = ctx.getDefaultLabel();
    }

    // handling placeholder
    var placeholder = null;
    // labels have higher priority
    if (!label && ctx.auto !== 'none') {
      placeholder = !t.Nil.is(opts.placeholder) ? opts.placeholder : ctx.getDefaultLabel();
    }

    // handling name attribute
    var name = opts.name || ctx.name;

    var value = this.state.value;

    // handling error message
    var error = t.Func.is(opts.error) ? opts.error(this.state.value) : opts.error;

    // using the custom template defined above
    return dateTemplate({
      config: opts.config,
      disabled: opts.disabled,
      error: error,
      hasError: this.state.hasError,
      help: opts.help,
      label: label,
      name: name,
      onChange: this.onChange,
      placeholder: placeholder,
      value: value
    });

  }
});

aumTcomb.form.DateComponent = DateComponent;

module.exports = aumTcomb;
