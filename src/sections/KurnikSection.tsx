import React from "react";
import {SectionBox} from "../components/SectionBox";
import {EggForm} from "../components/EggForm";
import  {ChickenManager}  from "../components/ChickenManager";
import {EggChart} from "../components/charts/EggChart";

export const KurnikSection: React.FC = () => (
  <>
    <SectionBox>
      <div className="widget-container">
        <div className="widget">
          <EggForm />
        </div>
        <div className="widget">
          <ChickenManager />
        </div>
      </div>
    </SectionBox>

    <SectionBox>
      <div className="widget-container">
        <div className="widget-full">
          <EggChart />
        </div>
      </div>
    </SectionBox>
  </>
);

