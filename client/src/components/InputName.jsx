import React, { Component } from 'react'
import { Hero,  HeroBody } from 'bloomer';
import { Field } from 'bloomer/lib/elements/Form/Field/Field';
import { Control } from 'bloomer/lib/elements/Form/Control';
import { Input } from 'bloomer/lib/elements/Form/Input';
import { Column } from 'bloomer/lib/grid/Column';
import { Columns } from 'bloomer/lib/grid/Columns';
import { Button } from 'bloomer/lib/elements/Button';

export default class InputName extends Component {
  constructor(props){
    super(props)
    this.state = {
      userName: ""
    }
  }

  setUser(e){
    e.preventDefault()
    this.props.newUser(this.state.userName)

  }

  handleChange(e){
    this.setState({userName: e.target.value})
  }
  render() {
    return (
      <Hero isColor='info' isSize='large' className="hero-section">
        <HeroBody>
            <Columns isCentered isVCentered>
            <Column isSize={{mobile: 8, default: 4}} >
            <form onSubmit={(e)=> this.setUser(e)}>
            <Field isGrouped>
                <Input 
                  onChange={e => this.handleChange(e)}
                  type="text" 
                  placeholder="your name..."
                  value={this.state.userName}/>
              <Control>
            <Button 
              isColor="danger" 
              onClick={(e)=> this.setUser(e)}>Chat!</Button>
              </Control>
            </Field>
            </form>
            </Column>
            </Columns>
        </HeroBody>
</Hero>
    )
  }
}
