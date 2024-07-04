import RepeatOptions from "./RepeatOptions";

const RepeatOption = ({ showRepeatOptions, daysOfWeek, setDaysOfWeek, repeatUntil, setRepeatUntil, handleRepeatChange, handleCancelRepeat, handleConfirmRepeat }) => {
  return (
    <>
      <div>
        <input
          type="checkbox"
          id="repeat"
          checked={Object.values(daysOfWeek).some((day) => day)}
          onChange={handleRepeatChange}
        />
        <label htmlFor="repeat"> Repeat</label>
      </div>
      {showRepeatOptions && (
        <RepeatOptions
          daysOfWeek={daysOfWeek}
          setDaysOfWeek={setDaysOfWeek}
          onConfirm={handleConfirmRepeat}
          onCancel={handleCancelRepeat}
          repeatUntil={repeatUntil}
          setRepeatUntil={setRepeatUntil}
        />
      )}
    </>
  );
};

export default RepeatOption;
