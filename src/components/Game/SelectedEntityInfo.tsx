import React, { ReactElement, DOMElement } from 'react';
import * as Helpers from '../../helpers/Helpers';
import {SquaresService, EntitiesService} from '../../services';
import EntityCard from '../EntityCard/EntityCard';
import { Square } from '../../services/SquaresService';
import { Entity, Position } from '../../services/EntitiesValues';

interface SelectedEntityInfoProperties{
    selected:Entity
    onInventoryClick: Function
    handleDeselectAllEntities: () => void
}

export default class SelectedEntityInfo extends React.Component<SelectedEntityInfoProperties> {
    
    render () {
        if(!this.props.selected){
            return null;
        }

        return(
            <div className="selected">
                <strong>Selected entity </strong>
                <div>
                <EntityCard onInventoryClick={this.props.onInventoryClick} entity={this.props.selected} />
                </div>
                <button onClick={this.props.handleDeselectAllEntities} className="button"> Deselect</button>              
            </div>
            )
        }
    }