import { StaticImageData } from "next/image";
import * as React from "react";
import Image from "next/image";

interface IDashboardProps {
  key: number;
  dashimage: StaticImageData;
  deskripsi: string;
}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
        <div className="benefit-image">
          <div className="ben-img">
            <Image src={props.dashimage} alt="Unknown" />
          </div>
          <h3 className="deskripsi-star">
            {props.deskripsi}
          </h3>
        </div>
    
  );
};

export default Dashboard;
