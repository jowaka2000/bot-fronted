import React from "react";
import step1 from "../../assets/page-id-images/page_id_step_1.jpeg";
import step2 from "../../assets/page-id-images/page_id_step_2.jpeg";
import step3 from "../../assets/page-id-images/page_id_step_3.jpeg";
import step4 from "../../assets/page-id-images/page_id_step_4.jpeg";
import step5 from "../../assets/page-id-images/page_id_step_5.jpeg";
import step6 from "../../assets/page-id-images/page_id_step_6.jpeg";
import step7 from "../../assets/page-id-images/page_id_step_7.jpeg";
import step8 from "../../assets/page-id-images/page_id_step_8.jpeg";
import step9 from "../../assets/page-id-images/page_id_step_9.jpeg";
import step10 from "../../assets/page-id-images/page_id_step_10.jpeg";

const PageId = () => {
  return (
    <div className="flex w-full justify-center pt-20" id="facebook-page-id">

      <article className="w-full md:w-7/12 space-y-10">
        <h2 className="text-4xl font-bold flex  justify-start md:justify-center w-full">
          How To Get Facebook Page ID{" "}
        </h2>
      
      
      
        <article className="space-y-3 bg-slate-100 p-2">
          <h1 className="text-lg font-semibold">Step I</h1>
          <p className="text-gray-800">
            Open Your facebook Page and click on menu item at the top right
            corner
          </p>
          <div className="flex justify-center md:justify-start">
            <img src={step1} alt="step1" className="w-72" />
          </div>
        </article>


  
        <article className="space-y-3 bg-slate-100 p-2">
          <h1 className="text-lg font-semibold">Step II</h1>
          <p className="text-gray-800">
           
           Click on the drop down menu to select the page you want to check ID. You can either click 
           the drop down menu or the "Pages" button at the bottom.
          </p>
          <div className="flex justify-center md:justify-start">
            <img src={step2} alt="step2" className="w-72" />
          </div>
        </article>


        <article className="space-y-3 bg-slate-100 p-2">
          <h1 className="text-lg font-semibold">Step III</h1>
          <p className="text-gray-800">
           
           From the menu, click on the Page you want to check the Page ID. In our case, 
           we want to check Fbook Post Page.This will open the Page Dashboard.
          </p>
          <div className="flex justify-center md:justify-start">
            <img src={step3} alt="step3" className="w-72" />
          </div>
        </article>


        <article className="space-y- bg-slate-100 p-2">
          <h1 className="text-lg font-semibold">Step IV</h1>
          <p className="text-gray-800">
           
           Click On the menu Button At the top right corner
          </p>
          <div className="flex justify-center md:justify-start">
            <img src={step4} alt="step4" className="w-72" />
          </div>
        </article>

        <article className="space-y-3 bg-slate-100 p-2">
          <h1 className="text-lg font-semibold">Step V</h1>
          <p className="text-gray-800">
           
           Click the name your your Page at the top. 
          </p>
          <div className="flex justify-center md:justify-start">
            <img src={step5} alt="step5" className="w-72" />
          </div>
        </article>





        <article className="space-y-3 bg-slate-100 p-2">
          <h1 className="text-lg font-semibold">Step VI</h1>
          <p className="text-gray-800">
           
           Click the name your your Page at the top. This will 
           Open you Page Account information. From here, you can click
           on <b>About</b> tab to show about your page
          </p>
          <div className="flex justify-center md:justify-start">
            <img src={step6} alt="step6" className="w-72" />
          </div>
        </article>

        <article className="space-y-3 bg-slate-100 p-2">
          <h1 className="text-lg font-semibold">Step VII</h1>
          <p className="text-gray-800">
           
           Click on <small className="text-blue-500">See All</small> on <b>Page transparency</b> section
          </p>
          <div className="flex justify-center md:justify-start">
            <img src={step7} alt="step7" className="w-72" />
          </div>
        </article>

        <article className="space-y-3 bg-slate-100 p-2">
          <h1 className="text-lg font-semibold">Step VIII</h1>
          <p className="text-gray-800">
           
           In step eight, Click on <small className="text-blue-500" >Go to Ad Library</small> 
           under <b>Ads from this Page</b> section. This will open a new Page that show Ads and About.
          </p>
          <div className="flex justify-center md:justify-start">
            <img src={step8} alt="step8" className="w-72" />
          </div>
        </article>

        <article className="space-y-3 bg-slate-100 p-2">
          <h1 className="text-lg font-semibold">Step IX</h1>
          <p className="text-gray-800">
           In step eight, Click on <small className="text-blue-500" >Go to Ad Library</small> 
           under <b>Ads from this Page</b> section
          </p>
          <div className="flex justify-center md:justify-start">
            <img src={step9} alt="step9" className="w-72" />
          </div>
        </article>


        
        <article className="space-y-3 bg-slate-100 p-2">
          <h1 className="text-lg font-semibold">Step X</h1>
          <p className="text-gray-800">
           In "about" tab, you will be able to see your page id at the bottom under <b>Page transparency,page and account </b> section as shown below.
          </p>
          <div className="flex justify-center md:justify-start">
            <img src={step10} alt="step10" className="w-72" />
          </div>
        </article>


        
      </article>
    </div>
  );
};

export default PageId;
