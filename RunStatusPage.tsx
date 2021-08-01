import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import PieChart, {
  Series,
  Size,
  Tooltip as PieChartTooltip,
  Legend,
} from "devextreme-react/pie-chart";
// import IconButtonCommon from "src/components/Common/IconButtonCommon/IconButtonCommon"; // TODO 追加
import IconButtonCommon from "./Common/IconButtonCommon"; // TODO 削除
import Card from "@material-ui/core/Card";
import {
  CircularGauge,
  Label as CircularGaugeLabel,
  RangeContainer as CircularGaugeRangeContainer,
  Range as CircularGaugeRange,
} from "devextreme-react/circular-gauge";
import {
  LinearGauge,
  Geometry,
  Scale,
  RangeContainer,
  Range,
  ValueIndicator,
} from "devextreme-react/linear-gauge";
// import { IKeyValue } from "src/utility/types"; // TODO 追加

// TODO 削除
interface IKeyValue {
  [key: string]: any;
}

/************************
 * コンポネントへのCSS設定
 ************************/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorIcon: {
      color: theme.palette.error.main,
      verticalAlign: "sub",
    },
    warningIcon: {
      color: theme.palette.warning.main,
      verticalAlign: "sub",
    },
    defaultColor: {
      color: theme.palette.text.primary,
    },
    widgetCard: {
      width: 500,
      height: 500,
      paddingLeft: 10,
      paddingRight: 10,
    },
    paper: {
      height: "100%",
    },
  })
);

/***************
 * CSSの色スタイル
 ***************/
const colorStyle: IKeyValue = {
  Warning: {
    color: "orange",
  },
  Error: {
    color: "red",
  },
  Normal: {},
};

/**************************
 * ウィジェットタイトルのスタイル
 **************************/
const widgetTitleDisplayStyle: IKeyValue = {
  Normal: {
    height: "84px",
    display: "flex",
    alignItems: "center",
  },
  Warning: {},
  Error: {},
};

/***************************************
 * 数値を切り上げる
 *
 * @param num 四捨五入する数
 * @param precision 保存する小数点以下の桁数
 * @author L.Son(MSW)
 * @date 2021.07.30
 ***************************************/
function roundUp(num: number, precision: number) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

/***************************************
 * LinearProgressの色をカスタマイズする
 *
 * @param theme マテリアルUIのテーマ
 * @author L.Son(MSW)
 * @date 2021.07.30
 ***************************************/
const ColoredLinearProgress = withStyles((theme) => ({
  root: {
    height: 30,
  },
  colorPrimary: {
    backgroundColor: "#F2F2F2",
  },
  colorSecondary: {
    backgroundColor: "#F2F2F2",
  },
  barColorPrimary: {
    backgroundColor: "orange",
  },
  barColorSecondary: {
    backgroundColor: "#76ff03",
  },
}))(LinearProgress);

/**********************************
 * LinearProgressの色をカスタマイズする
 *
 * @param taskExecutionStatus タスク実行状態
 * @param taskStatus タスク状態
 * @returns LinearProgress
 * @returns L.Son(MSW)
 * @date 2021.07.30
 **********************************/
const LinearProgressCustom: React.FC<{
  taskExecutionStatus: TaskExecutionStatus;
  taskStatus: TaskStatus;
}> = ({ taskExecutionStatus, taskStatus }) => {
  return (
    <ColoredLinearProgress
      color={
        taskExecutionStatus === TaskExecutionStatus.Warning
          ? "primary"
          : "secondary"
      }
      variant={taskStatus === TaskStatus.Run ? "indeterminate" : "buffer"}
      value={0}
    />
  );
};

/******************************
 * PieChartのツールチップの表示形を作成する
 *
 * @param arg PieChartのデータ
 * @returns PieChartのツールチップ
 *
 ******************************/
const customizeTooltip = (arg: any) => {
  // TODO L.Son(MSW) リソースに切り替える
  return {
    text: `${arg.argumentText} : ${arg.value} [ms] – ${arg.percentText}`,
  };
};

/*****************************************
 * DevExtreme PieChartをカスタマイズする
 *
 * @param dataSource データソース
 * @returns PieChart
 * @author L.Son(MSW)
 * @date 2021.07.30
 *****************************************/
const PieChartCustom: React.FC<{
  dataSource: Array<any>;
}> = ({ dataSource }) => {
  return (
    <PieChart dataSource={dataSource}>
      <PieChartTooltip
        enabled={true}
        format="currency"
        customizeTooltip={customizeTooltip}
      />
      <Legend visible={false} />
      <Series argumentField="ai_name" valueField="predict_time" />
      <Size width={250} height={300} />
    </PieChart>
  );
};

/*****************************************
 * DevExtreme CircularGaugeをカスタマイズする
 *
 * @param minValue 最小値
 * @param maxValue 最大値
 * @param value 入力処理時間
 * @param collectionPeriod 収集周期
 * @returns CircularGauge
 * @author L.Son(MSW)
 * @date 2021.07.30
 *****************************************/
const CircularGaugeCustom: React.FC<{
  minValue: number;
  value: number;
  maxValue: number;
  collectionPeriod: number;
}> = ({ value, maxValue, minValue, collectionPeriod }) => {
  return (
    <CircularGauge value={value}>
      <Scale startValue={minValue} endValue={maxValue}>
        <CircularGaugeLabel useRangeColors={true} />
      </Scale>
      <CircularGaugeRangeContainer palette="Soft Blue">
        <CircularGaugeRange startValue={minValue} endValue={collectionPeriod} />
        <CircularGaugeRange
          startValue={collectionPeriod}
          endValue={maxValue}
          color="orange"
        />
      </CircularGaugeRangeContainer>
    </CircularGauge>
  );
};

/*****************************************
 * DevExtreme LinearGaugeをカスタマイズする
 *
 * @param minValue データバッファ使用量の最小値
 * @param maxValue データバッファ使用量の最大値
 * @param value データバッファ使用量の値
 * @param dataBuffer データバッファの値
 * @returns CircularGauge
 * @author L.Son(MSW)
 * @date 2021.07.30
 *****************************************/
const LinearGaugeCustom: React.FC<{
  minValue: number;
  value: number;
  maxValue: number;
  dataBuffer: number;
}> = ({ value, maxValue, minValue, dataBuffer }) => {
  return (
    <LinearGauge id="gauge" value={(value * 100) / dataBuffer}>
      <Geometry orientation="vertical" />
      <ValueIndicator type="triangleMarker"></ValueIndicator>
      <Scale startValue={0} endValue={100} />
      <RangeContainer offset={10}>
        <Range startValue={minValue} endValue={(maxValue * 100) / dataBuffer} />
        <Range
          startValue={(maxValue * 100) / dataBuffer}
          endValue={100}
          color="orange"
        />
      </RangeContainer>
    </LinearGauge>
  );
};

/**********************
 * タスク実行状態の列挙列
 *
 * @author L.Son(MSW)
 * @date 2021.07.30
 ***********************/
const TaskExecutionStatus: IKeyValue = {
  Error: "Error",
  Warning: "Warning",
  Normal: "Normal",
};
type TaskExecutionStatus = keyof typeof TaskExecutionStatus;

/*******************
 * タスク状態
 * TODO L.Son(MSW) タスクモデルに移動する
 *
 * @author L.Son(MSW)
 * @date 2021.07.30
 *******************/
const TaskStatus: IKeyValue = {
  Ready: "Ready",
  Run: "Run",
  Stop: "Stop",
};
type TaskStatus = keyof typeof TaskStatus;

/***************************
 * タスクウイジェットのプロパティ
 *
 * @author L.Son(MSW)
 * @date 2021.07.30
 ***************************/
interface TaskRunWidgetProps {
  taskExecutionStatus: TaskExecutionStatus;
  handleIconClick: () => void;
  text: NonNullable<React.ReactNode>;
  title: NonNullable<React.ReactNode>;
  renderWidgetContent: () => JSX.Element;
}

/***************************
 * タスクウイジェットを作成する
 *
 * @author L.Son(MSW)
 * @date 2021.07.30
 ***************************/
const TaskRunWidget: React.FC<TaskRunWidgetProps> = ({
  taskExecutionStatus,
  text,
  handleIconClick,
  title,
  renderWidgetContent,
}) => {
  // CSSスタイルインスタンスを作成する
  const classes = useStyles();

  return (
    <Card className={classes.widgetCard}>
      <Typography
        className={classes.defaultColor}
        style={{
          ...colorStyle[taskExecutionStatus],
          ...widgetTitleDisplayStyle[taskExecutionStatus],
        }}
      >
        {/***************
         * アイコンボタン
         ****************/}
        <WidgetIcon
          taskExecutionStatus={taskExecutionStatus}
          handleIconClick={handleIconClick}
        />
        {text}
      </Typography>
      {/*******************
       * ウィジェットタイトル
       ********************/}
      <Typography
        variant="h5"
        style={{
          textAlign: "center",
          ...colorStyle[taskExecutionStatus],
        }}
      >
        <span
          style={{
            textDecoration:
              taskExecutionStatus !== TaskExecutionStatus.Normal
                ? "underline"
                : "none",
          }}
        >
          {title}
        </span>
      </Typography>
      {renderWidgetContent()}
    </Card>
  );
};

/*********************************
 * 実行状態に基づいてアイコンを作成する
 *
 * @param taskExecutionStatus 実行状態
 * @param handleIconClick アイコンを押下した時のハンドル
 * @returns 該当するアイコン
 *********************************/
const WidgetIcon: React.FC<{
  taskExecutionStatus: TaskExecutionStatus;
  handleIconClick: () => void;
}> = ({ taskExecutionStatus, handleIconClick }) => {
  // CSSスタイルインスタンスを作成する
  const classes = useStyles();

  // アイコン表示ステート
  const [iconDisplay, setIconDisplay] = useState(true);

  // 自動更新処理
  useEffect(() => {
    let updaterId: any = null;
    let display = iconDisplay;

    // 実行状態が正常以外である場合、アイコンを瞬く
    if (taskExecutionStatus !== TaskExecutionStatus.Normal) {
      updaterId = setInterval(() => {
        display = !display;
        setIconDisplay(display);
      }, 1000);
    }
    return () => {
      clearInterval(updaterId);
    };
  }, [taskExecutionStatus]);

  // ボックスのデフォルトスタイル
  const defaultProps = {
    bgcolor: "background.paper",
    borderColor: "info.main",
    m: 2,
    border: 2,
    style: { width: "3rem", height: "3rem" },
  };

  // ウィジェットのアイコンを定時する
  const WidgetIcon: IKeyValue = {
    Warning: (
      <IconButtonCommon
        tooltip="警告が発生" // TODO リソースに切り替える
        onClick={handleIconClick}
        icon={() => <WarningIcon className={classes.warningIcon} />}
      />
    ),
    Error: (
      <IconButtonCommon
        tooltip="エラーが発生" // TODO L.Son(MSW) リソースに切り替える
        onClick={handleIconClick}
        icon={() => <ErrorIcon className={classes.errorIcon} />}
      />
    ),
    Normal: null,
  };

  // 実行状態に従ってウィジェットのアイコンを取得する
  const widgetIcon = WidgetIcon[taskExecutionStatus];

  if (widgetIcon) {
    // タスク実行状態が正常でない場合、該当するアイコンを返す
    return (
      <div style={{ display: "inline-block" }}>
        <Box borderRadius="50%" {...defaultProps}>
          <Fade in={iconDisplay}>{widgetIcon}</Fade>
        </Box>
      </div>
    );
  } else {
    // それ以外、空を返す
    return <React.Fragment></React.Fragment>;
  }
};

/**************************
 * タスク実行状態画面を作成する
 *
 * @author L.Son(MSW)
 * @date 2021.07.30
 **************************/
const RunStatusPage: React.FC = () => {
  // CSSスタイルインスタンスを作成する
  const classes = useStyles();

  /************************************
   * イベントログアイコンを押下した時のハンドル
   *
   * @author L.Son(MSW)
   * @date 2021.07.30
   ************************************/
  const handleEventLogButtonClick = () => {
    // TODO L.Son(MSW) イベントログ画面へ移動する
  };

  // TODO L.Son(MSW) BEに繋がったら削除
  const taskMockDataInfo = {
    // タスク状態
    taskExecutionStatus: TaskExecutionStatus.Warning,
    taskStatus: TaskStatus.Run,

    // 入力処理ウィジェット
    inputProcessTime: 645,
    inputProcessCollectionPeriod: 800,

    // データバッファ使用量
    dataBufferUsage: 300,
    dataBufferUsageMax: 1000,
    dataBufferMax: 2000,

    // 診断ウィジェット
    predictTime: 500,
    predictCollectionPeriod: 900,
    predictAiDataSource: [
      { ai_name: "SVM", predict_time: 1233 },
      { ai_name: "Random Forest", predict_time: 587 },
      { ai_name: "Deep learning", predict_time: 1779 },
    ],

    // 出力ウィジェット
    outputPredictTime: 500,
    outputCollectionPeriod: 900,
    outputProcessTime: 115,
  };

  /*****************************************
   * 入力処理時間ウィジェットのアイコンを押下した時のハンドル
   *
   * @author L.Son(MSW)
   * @date 2021.07.30
   *****************************************/
  const handleInputWidgetIconClick = () => {
    // TODO L.Son(MSW)
  };

  /*****************************************
   * 診断ウィジェットのアイコンを押下した時のハンドル
   *
   * @author L.Son(MSW)
   * @date 2021.07.30
   *****************************************/
  const handlePredictWidgetIconClick = () => {
    // TODO L.Son(MSW)
  };

  /*****************************************
   * 出力処理時間ウィジェットのアイコンを押下した時のハンドル
   *
   * @author L.Son(MSW)
   * @date 2021.07.30
   *****************************************/
  const handleOutputWidgetIconClick = () => {
    // TODO L.Son(MSW)
  };

  /**************************************
   * 入力処理時間ウィジェットの内容を作成する
   *
   * @author L.Son(MSW)
   * @date 2021.07.30
   **************************************/
  const renderInputWidgetContent = () => {
    // TODO L.Son(MSW)
    return (
      <Grid container alignItems="center">
        {/******************
         * 入力処理時間ゲージ
         *******************/}
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <CircularGaugeCustom
            value={taskMockDataInfo.inputProcessTime}
            minValue={0}
            maxValue={roundUp(
              taskMockDataInfo.inputProcessCollectionPeriod * 1.3,
              3
            )}
            collectionPeriod={taskMockDataInfo.inputProcessCollectionPeriod}
          />
          {/**************
           * 入力処理時間値
           ***************/}
          <Typography
            variant="h4"
            className={classes.defaultColor}
            style={{
              ...colorStyle[taskMockDataInfo.taskExecutionStatus],
            }}
          >
            {/* TODO L.Son(MSW) リソースに切り替える */}
            {taskMockDataInfo.taskStatus === TaskStatus.Run
              ? taskMockDataInfo.inputProcessTime
              : "-"}
            [ms]
          </Typography>
          {/* TODO L.Son(MSW) リソースに切り替える */}
          <Typography>入力処理時間</Typography>
        </Grid>
        {/**********************
         * データバッファ使用量ゲージ
         ***********************/}
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <LinearGaugeCustom
            value={taskMockDataInfo.dataBufferUsage}
            minValue={0}
            maxValue={taskMockDataInfo.dataBufferUsageMax}
            dataBuffer={taskMockDataInfo.dataBufferMax}
          />
          {/* TODO L.Son(MSW) リソースに切り替える */}
          <Typography
            variant="h4"
            className={classes.defaultColor}
            style={{
              ...colorStyle[taskMockDataInfo.taskExecutionStatus],
            }}
          >
            {roundUp(
              taskMockDataInfo.dataBufferUsage / taskMockDataInfo.dataBufferMax,
              2
            )}
          </Typography>
          {/* TODO L.Son(MSW) リソースに切り替える */}
          <Typography>データバッファ使用量</Typography>
        </Grid>
      </Grid>
    );
  };

  /********************************
   * 診断ウィジェットの内容を作成する
   *
   * @author L.Son(MSW)
   * @date 2021.07.30
   ********************************/
  const renderPredictWidgetContent = () => {
    // TODO L.Son(MSW)
    return (
      <Grid container alignItems="center">
        {/******************
         * AI処理時間ゲージ
         *******************/}
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <CircularGaugeCustom
            value={taskMockDataInfo.predictTime}
            minValue={0}
            maxValue={roundUp(
              taskMockDataInfo.predictCollectionPeriod * 1.3,
              3
            )}
            collectionPeriod={taskMockDataInfo.predictCollectionPeriod}
          />
          {/**************
           * AI処理時間値
           ***************/}
          <Typography
            variant="h4"
            className={classes.defaultColor}
            style={{
              ...colorStyle[taskMockDataInfo.taskExecutionStatus],
            }}
          >
            {/* TODO L.Son(MSW) リソースに切り替える */}
            {taskMockDataInfo.taskStatus === TaskStatus.Run
              ? taskMockDataInfo.inputProcessTime
              : "-"}
            [ms]
          </Typography>
          {/* TODO L.Son(MSW) リソースに切り替える */}
          <Typography>AI処理時間</Typography>
        </Grid>
        {/**********************
         * 処理時間使用割合チャート
         ***********************/}
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <PieChartCustom dataSource={taskMockDataInfo.predictAiDataSource} />
        </Grid>
      </Grid>
    );
  };

  /********************************
   * 入力処理時間ウィジェットの内容を作成する
   *
   * @author L.Son(MSW)
   * @date 2021.07.30
   ********************************/
  const renderOutputWidgetContent = () => {
    // TODO L.Son(MSW)
    return (
      <Grid container alignItems="center">
        {/******************
         * 出力処理時間ゲージ
         *******************/}
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <CircularGaugeCustom
            value={taskMockDataInfo.outputProcessTime}
            minValue={0}
            maxValue={roundUp(taskMockDataInfo.outputCollectionPeriod * 1.3, 3)}
            collectionPeriod={taskMockDataInfo.outputCollectionPeriod}
          />
          {/**************
           * 出力処理時間値
           ***************/}
          <Typography
            variant="h4"
            className={classes.defaultColor}
            style={{
              ...colorStyle[taskMockDataInfo.taskExecutionStatus],
            }}
          >
            {/* TODO L.Son(MSW) リソースに切り替える */}
            {taskMockDataInfo.taskStatus === TaskStatus.Run
              ? taskMockDataInfo.outputProcessTime
              : "-"}
            [ms]
          </Typography>
          {/* TODO L.Son(MSW) リソースに切り替える */}
          <Typography>出力処理時間</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid container alignItems="flex-end">
          <Grid container justify="flex-end">
            {/*********************
             * イベントログ確認ボタン
             **********************/}
            <IconButtonCommon
              tooltip="イベントログを確認する" //* TODO L.Son(MSW) リソースに切り替える
              onClick={handleEventLogButtonClick}
              icon={() => <FindInPageIcon />} // TODO 修正
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        style={{ justifyContent: "center", flexWrap: "nowrap" }}
      >
        {/******************
         * 入力ウィジェット
         ******************/}
        <TaskRunWidget
          taskExecutionStatus={
            TaskExecutionStatus[taskMockDataInfo.taskExecutionStatus]
          }
          text={
            taskMockDataInfo.inputProcessTime +
            " [ms] / " +
            taskMockDataInfo.inputProcessCollectionPeriod +
            " [ms]"
          } //* TODO L.Son(MSW) リソースに切り替える
          title="入力データストリーム" //* TODO L.Son(MSW) リソースに切り替える
          handleIconClick={handleInputWidgetIconClick}
          renderWidgetContent={renderInputWidgetContent}
        />
        {/********************
         * 入力診断間プログレス
         *********************/}
        <Grid item xs={1}>
          <LinearProgressCustom
            taskExecutionStatus={taskMockDataInfo.taskExecutionStatus}
            taskStatus={taskMockDataInfo.taskStatus}
          />
        </Grid>
        {/********************
         * 診断ウイジェット
         *********************/}
        <TaskRunWidget
          taskExecutionStatus={
            TaskExecutionStatus[taskMockDataInfo.taskExecutionStatus]
          }
          text={
            taskMockDataInfo.predictTime +
            " [ms] / " +
            taskMockDataInfo.predictCollectionPeriod +
            " [ms]"
          } //* TODO L.Son(MSW) リソースに切り替える
          title="診断" //* TODO L.Son(MSW) リソースに切り替える
          handleIconClick={handlePredictWidgetIconClick}
          renderWidgetContent={renderPredictWidgetContent}
        />
        {/*******************
         * 診断出力間プログレス
         ********************/}
        <Grid item xs={1}>
          <LinearProgressCustom
            taskExecutionStatus={taskMockDataInfo.taskExecutionStatus}
            taskStatus={taskMockDataInfo.taskStatus}
          />
        </Grid>
        {/****************
         * 出力ウィジェット
         *****************/}
        <TaskRunWidget
          taskExecutionStatus={
            TaskExecutionStatus[taskMockDataInfo.taskExecutionStatus]
          }
          text={
            taskMockDataInfo.outputProcessTime +
            " [ms] / " +
            taskMockDataInfo.outputCollectionPeriod +
            " [ms]"
          } //* TODO L.Son(MSW) リソースに切り替える
          title="出力データストリーム全体" //* TODO L.Son(MSW) リソースに切り替える
          handleIconClick={handleOutputWidgetIconClick}
          renderWidgetContent={renderOutputWidgetContent}
        />
      </Grid>
    </React.Fragment>
  );
};
export default RunStatusPage;
