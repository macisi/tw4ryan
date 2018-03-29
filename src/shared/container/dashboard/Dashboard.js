import { PureComponent } from 'react';
import injectSheet from 'react-jss';

const styles = {
  demo: {
    color: '#f90',
  },
};

class Dashboard extends PureComponent {
  render() {
    const { classes } = this.props;
    return <div className={classes.demo}>Dashboard1231122</div>;
  }
}

export default injectSheet(styles)(Dashboard);