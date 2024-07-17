// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AddQuestion = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (stage: string, key?: string, value?: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("stage", stage);

      if (key && value) {
        params.set(key, value);
      }
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    if (searchParams.get("stage") === null) {
      updateSearchParams("1");
    }
  }, [searchParams, updateSearchParams]);

  return (
    <div className="relative max-h-full h-full px-2">
      {/* <div>{stage}</div>
      <div>{ids}</div> */}
      <div>
        {searchParams.size === 1 && (
          <div id="tab_1">
            tab_1
            <br />
            <br />
            <Button
              onClick={() => {
                updateSearchParams("2", "board_id", "board_id");
              }}>
              Add searchParams
            </Button>
          </div>
        )}
        {searchParams.size === 2 && (
          <div id="tab_2">
            tab_2
            <br />
            <br />
            <Button
              onClick={() => {
                updateSearchParams("3", "institute_id", "institute_id");
              }}>
              Add searchParams
            </Button>
          </div>
        )}
        {searchParams.size === 3 && (
          <div id="tab_3">
            tab_3
            <br />
            <br />
            <Button
              onClick={() => {
                updateSearchParams("4", "class_id", "class_id");
              }}>
              Add searchParams
            </Button>
          </div>
        )}
        {searchParams.size === 4 && (
          <div id="tab_4">
            tab_4
            <br />
            <br />
            <Button
              onClick={() => {
                updateSearchParams("5", "subject_id", "subject_id");
              }}>
              Add searchParams
            </Button>
          </div>
        )}
        {searchParams.size === 5 && (
          <div id="tab_5">
            tab_5
            <br />
            <br />
            <Button
              onClick={() => {
                updateSearchParams("6", "class_id", "class_id");
              }}>
              Add searchParams
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQuestion;
