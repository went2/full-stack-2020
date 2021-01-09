import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

// material ui 组件
import Button from '@material-ui/core/Button';

const Toggle = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false);

  // 根据子组件的显示与否，定义toggle组件中两个按钮的 css display 的属性值
  // onClick of 'log in' button => loginVisible set to true => login components and cancel button show
  // onClisk of 'cancel' button => loginVisible set to false => login components and cancel button hide

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={toggleVisibility}>取消</Button>
      </div>
    </div>
  )
})

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Toggle.displayName = 'Toggle';

export default Toggle;