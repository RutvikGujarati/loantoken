import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoadingScreen = () => {
  return (
    <div className="container">
      <div className="row">
        {[...Array(8)].map((_, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <Skeleton height={150} className="mb-2" />
                <Skeleton height={20} width={`60%`} className="mb-2" />
                <Skeleton height={15} count={2} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
