import React, {PureComponent} from 'react';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanel extends PureComponent {
  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
       
        
        <p> <a href="https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population"></a></p>
        <div className="source-link">
          <a href="https://github.com/uber/react-map-gl/tree/4.0-release/examples/controls" target="_new"></a>
        </div>
      </Container>
    );
  }
}