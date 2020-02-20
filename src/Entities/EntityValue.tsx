import React, { Fragment } from "react";
import ID from "./ID";
import Value from "./Value";
import { EntityValue as EntityValueData, Label, isReference } from "./data";

type Props = {
  value: EntityValueData;
  label?: Label | null | undefined;
  Component?: React.ComponentType;
};

/**
 * Component to render entity values.
 * An entity value can be either another entity, a simple literal (e.g. number) or text.
 * The component may be provided with a label for an entity.
 * For entities the component will create a link to the entity page.
 * The component may be provided with a Component to wrap the rendered value.
 */
const EntityValue = ({ value, label, Component = Fragment }: Props) => {
  // Entity values
  if (isReference(value)) {
    return <ID id={value["@id"]} label={label} Component={Component} />;
  }
  return <Value value={value} Component={Component} />;
};

export default EntityValue;