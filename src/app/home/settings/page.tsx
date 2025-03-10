import SaveBtn from "@/app/components/savebtn/savebtn";
import "./settings.scss";
export default function Settings() {
  return (
    <>
      <main>
        <h1 id="SettingsHead">Settings</h1>
        <h4 id="arcticIdTitle">
          <span id="arcid1" className="arcid">
            arctic_id:
          </span>
          <span> </span>
          <span id="arcid2" className="arcid">
             youremail@domain.com
          </span>
        </h4>
        <p className="GamerTagLabel">Java Gamertag:</p>
        <input className="GamerTagInput" type="text" />
        <p className="GamerTagLabel">Bedrock Gamertag:</p>
        <input className="GamerTagInput" type="text" />
        <div style={{
            "marginBottom": "5vh"
        }}></div>
        <SaveBtn />
      </main>
    </>
  );
}
