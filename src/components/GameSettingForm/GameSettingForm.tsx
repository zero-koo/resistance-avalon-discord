import React, { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiMinus, FiPlus } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import { z } from "zod";

import {
  OptionalCitizenType,
  optionalCitizenTypes,
  OptionalDevilType,
  optionalDevilTypes,
} from "@/constants/characters";
import {
  DEFAULT_NUM_PLAYERS,
  MAX_NUM_PLAYERS,
  MIN_NUM_PLAYERS,
  possibleNumExpeditions,
} from "@/constants/settings";
import { cn } from "@/lib/utils";
import { GameSetting } from "@/contexts/GameSettingContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";

import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import { Button } from "../ui/Button";

const gameSettingSchema = z
  .object({
    numPlayers: z.number().min(5).max(10),
    numExpeditions: z.array(z.number()),
    optionalCharacters: z.object({
      citizen: z.array(z.enum(optionalCitizenTypes)),
      devil: z.array(z.enum(optionalDevilTypes)),
    }),
  })
  .superRefine(({ numPlayers, optionalCharacters }, ctx) => {
    if (Math.ceil(numPlayers / 3) - 1 < optionalCharacters.devil.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["optionalCharacters"],
        message: "특수 캐릭터의 수가 플레이어 수에 비해 많습니다.",
      });
    }
  });

type GameSettingFormProps = {
  formId: string;
  initialSetting?: GameSetting;
  onSubmit?: (setting: GameSetting) => void;
};
const GameSettingForm: React.FC<GameSettingFormProps> = ({
  formId,
  initialSetting,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof gameSettingSchema>>({
    resolver: zodResolver(gameSettingSchema),
    defaultValues: {
      numPlayers: initialSetting?.numPlayers ?? DEFAULT_NUM_PLAYERS,
      numExpeditions:
        initialSetting?.numExpeditions ??
        possibleNumExpeditions[DEFAULT_NUM_PLAYERS][0],
      optionalCharacters: {
        citizen: initialSetting?.selectedOptionalCitizens ?? [],
        devil: initialSetting?.selectedOptionalDevils ?? [],
      },
    },
  });
  const numPlayers = form.watch("numPlayers");

  return (
    <Form {...form}>
      <form
        className="w-full space-y-4"
        id={formId}
        onSubmit={form.handleSubmit((data) =>
          onSubmit?.({
            ...data,
            selectedOptionalCitizens: data.optionalCharacters.citizen,
            selectedOptionalDevils: data.optionalCharacters.devil,
            anonymousVote: false,
          })
        )}
      >
        <FormField
          control={form.control}
          name="numPlayers"
          render={({ field }) => <NumPlayersField {...field} />}
        />
        <FormField
          control={form.control}
          name="numExpeditions"
          render={({ field }) => (
            <NumExpeditionsField {...field} numPlayers={numPlayers} />
          )}
        />
        <FormField
          control={form.control}
          name="optionalCharacters"
          render={({ field }) => {
            return (
              <OptionalCharacterField
                citizenSelection={{
                  Percival: field.value.citizen.includes("Percival"),
                }}
                devilSelection={{
                  Morgana: field.value.devil.includes("Morgana"),
                  Mordred: field.value.devil.includes("Mordred"),
                  Oberon: field.value.devil.includes("Oberon"),
                }}
                onChangeSelection={(selection) => {
                  field.onChange({
                    citizen: Object.entries(selection.citizen)
                      .filter(([, selected]) => selected)
                      .map(([character]) => character),
                    devil: Object.entries(selection.devil)
                      .filter(([, selected]) => selected)
                      .map(([character]) => character),
                  });
                }}
              />
            );
          }}
        />
        <ErrorMessage
          errors={form.formState.errors}
          name="optionalCharacters"
          render={({ message }) => (
            <p className="px-3 text-sm text-red-600">{message}</p>
          )}
        />
      </form>
    </Form>
  );
};

const NumPlayersField: React.FC<{
  value: number;
  onChange: (v: number) => void;
}> = ({ value, onChange }) => (
  <FormItem className="w-full" Label={() => <FormLabel>인원수</FormLabel>}>
    <FormControl>
      <div className="flex w-full items-center">
        <Button
          variant="secondary"
          size="icon"
          disabled={value === MIN_NUM_PLAYERS}
          onClick={() => onChange(value - 1)}
        >
          <FiMinus strokeWidth={2} size={16} />
        </Button>
        <span className="flex-1 select-none text-center text-lg">{value}</span>
        <Button
          variant="secondary"
          size="icon"
          disabled={value === MAX_NUM_PLAYERS}
          onClick={() => onChange(value + 1)}
        >
          <FiPlus strokeWidth={2} size={16} />
        </Button>
      </div>
    </FormControl>
  </FormItem>
);

const NumExpeditionsField: React.FC<{
  value: number[];
  numPlayers: number;
  onChange: (v: number[]) => void;
}> = ({ value, numPlayers, onChange }) => {
  const [isAdjusted, setIsAdjusted] = useState(false);

  useEffect(() => {
    onChange(possibleNumExpeditions[numPlayers][isAdjusted ? 1 : 0]);
  }, [numPlayers, isAdjusted]);

  return (
    <FormItem className="w-full" Label={() => <FormLabel>원정대원</FormLabel>}>
      <div className="flex flex-wrap items-center justify-between">
        <NumberArrayDisplay nums={value} className="gap-2.5 text-lg" />
        {possibleNumExpeditions[numPlayers].length > 1 ? (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mx-4 size-6"
              onClick={() => setIsAdjusted((v) => !v)}
            >
              <GoArrowSwitch size={12} strokeWidth={1.5} />
            </Button>
            <NumberArrayDisplay
              nums={possibleNumExpeditions[numPlayers][isAdjusted ? 0 : 1]}
              className="gap-2.5 text-lg font-light text-primary/30"
            />
          </>
        ) : null}
      </div>
    </FormItem>
  );
};

const NumberArrayDisplay: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    nums: number[];
  }
> = ({ nums, className, ...props }) => {
  return (
    <div
      className={cn("flex select-none items-center gap-2", className)}
      {...props}
    >
      {nums.map((num, index) => (
        <React.Fragment key={index}>
          <span>{num}</span>
          {index < nums.length - 1 && <span>-</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

const OptionalCharacterField: React.FC<{
  citizenSelection: Record<OptionalCitizenType, boolean>;
  devilSelection: Record<OptionalDevilType, boolean>;
  onChangeSelection: ({
    citizen,
    devil,
  }: {
    citizen: Record<OptionalCitizenType, boolean>;
    devil: Record<OptionalDevilType, boolean>;
  }) => void;
}> = ({ citizenSelection, devilSelection, onChangeSelection }) => {
  return (
    <FormItem
      className="flex w-full flex-wrap gap-x-4 gap-y-2"
      Label={() => <FormLabel>특수 캐릭터</FormLabel>}
    >
      <PlayerAvatar
        character={"Percival"}
        selectable
        isSelected={citizenSelection.Percival}
        onToggleSelect={(selected) => {
          onChangeSelection({
            citizen: {
              ...citizenSelection,
              Percival: selected,
            },
            devil: {
              ...devilSelection,
              Morgana: selected,
            },
          });
        }}
      />
      <PlayerAvatar
        character={"Morgana"}
        selectable
        isSelected={devilSelection.Morgana}
        onToggleSelect={(selected) => {
          onChangeSelection({
            citizen: {
              ...citizenSelection,
              Percival: selected,
            },
            devil: {
              ...devilSelection,
              Morgana: selected,
            },
          });
        }}
      />
      <PlayerAvatar
        character={"Mordred"}
        selectable
        isSelected={devilSelection.Mordred}
        onToggleSelect={(selected) => {
          onChangeSelection({
            citizen: citizenSelection,
            devil: {
              ...devilSelection,
              Mordred: selected,
            },
          });
        }}
      />
      <PlayerAvatar
        character={"Oberon"}
        selectable
        isSelected={devilSelection.Oberon}
        onToggleSelect={(selected) => {
          onChangeSelection({
            citizen: citizenSelection,
            devil: {
              ...devilSelection,
              Oberon: selected,
            },
          });
        }}
      />
    </FormItem>
  );
};

export default GameSettingForm;
