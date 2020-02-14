import React, { Fragment, useState, useEffect } from "react";
import Value from "./Value";
import PropertyName from "./PropertyName";
import {
  getEntity,
  EntityValueRecord,
  Entity as EntityData,
  RDFS_LABEL
} from "./data";

type Props = {
  entityID: string;
  serverURL: string;
  onError: (error: Error | null) => void;
  error: Error | null;
};

const Entity = ({ entityID, serverURL, onError, error }: Props) => {
  const [result, setResult] = useState<EntityData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    onError(null);
    setResult(null);
    setLoading(true);
    if (entityID) {
      getEntity(serverURL, entityID)
        .then(result => {
          setResult(result);
        })
        .catch(error => {
          onError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [entityID, serverURL, setResult, onError]);
  if (error) {
    return null;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (result === null) {
    return <NotFound />;
  }
  const labels = (result[RDFS_LABEL].values || []).map((record, i) => (
    <Value key={i} value={record.value} />
  ));
  return (
    <div className="Entity">
      <h1>{labels}</h1>
      {Object.entries(result).map(([propertyID, property]) => {
        const values = property.values;
        const valueNodes = values.map((record, i) => {
          const suffix = i === values.length - 1 ? null : ", ";
          return (
            <Fragment key={i}>
              <Value key={i} value={record.value} label={record.label} />
              {suffix}
            </Fragment>
          );
        });
        return (
          <div className="Property" key={propertyID}>
            <PropertyName property={propertyID} label={property.label} />:{" "}
            {valueNodes}
          </div>
        );
      })}
    </div>
  );
};

export default Entity;

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1>🤷 No entity found</h1>
    </div>
  );
};
