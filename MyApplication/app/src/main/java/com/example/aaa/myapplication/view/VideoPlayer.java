package com.example.aaa.myapplication.view;

import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.example.aaa.myapplication.R;

import java.net.URL;
import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by admin on 2016/3/24.
 */
public class VideoPlayer extends RelativeLayout {
    private final int MSG_HIDE_CONTROLLER = 10;
    private final int MSG_UPDATE_PLAY_TIME = 11;

    private Context mContext;
    private SuperVideoView mSuperVideoView;
    private VideoController mVideoController;

    private View mProgressBarView;//loading进度条
    private View mCloseBtnView;//关闭按钮

    private VideoController.PageType mCurrPageType;
    private Timer mUpdateTimer;

    public VideoPlayer(Context context) {
        super(context);
        initView(context);
    }

    public VideoPlayer(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(context);
    }

    public VideoPlayer(Context context, AttributeSet attrs) {
        super(context, attrs);
        initView(context);
    }
    public interface VideoPlayCallbackImpl {
        void onCloseVideo();

        void onSwitchPageType();

        void onPlayFinish();
    }
    private VideoPlayCallbackImpl mVideoPlayCallback;
    public void setVideoPlayCallback(VideoPlayCallbackImpl videoPlayCallback) {
        mVideoPlayCallback = videoPlayCallback;
    }
    private Handler mHandler = new Handler(new Handler.Callback() {
        @Override
        public boolean handleMessage(Message msg) {
            if (msg.what == MSG_UPDATE_PLAY_TIME) {
                updatePlayTime();
                updatePlayProgress();
            } else if (msg.what == MSG_HIDE_CONTROLLER) {
                //showOrHideController();
            }
            return false;
        }
    });
    private void resetUpdateTimer() {
        mUpdateTimer = new Timer();
        int TIME_UPDATE_PLAY_TIME = 1000;
        mUpdateTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                mHandler.sendEmptyMessage(MSG_UPDATE_PLAY_TIME);
            }
        }, 0, TIME_UPDATE_PLAY_TIME);
    }

    private void stopUpdateTimer() {
        if (mUpdateTimer != null) {
            mUpdateTimer.cancel();
            mUpdateTimer = null;
        }
    }
    private VideoController.MediaControlImpl mVideoControl = new VideoController.MediaControlImpl() {
       

        
        @Override
        public void onPlayTurn() {
            if (mSuperVideoView.isPlaying()) {
                pausePlay(true);
            } else {
                goOnPlay();
            }
        }

        @Override
        public void onPageTurn() {
            mVideoPlayCallback.onSwitchPageType();
        }

        @Override
        public void onProgressTurn(VideoController.ProgressState state, int progress) {
            if (state.equals(VideoController.ProgressState.START)) {
                goOnPlay();
            } else if (state.equals(VideoController.ProgressState.STOP)) {
                pausePlay(true);
            } else {
                int time = progress * mSuperVideoView.getDuration() / 100;
                mSuperVideoView.seekTo(time);
                updatePlayTime();
            }
        }
    };

    private MediaPlayer.OnPreparedListener mOnPreparedListener = new MediaPlayer.OnPreparedListener() {
        @Override
        public void onPrepared(MediaPlayer mediaPlayer) {
            mediaPlayer.setOnInfoListener(new MediaPlayer.OnInfoListener() {
                @Override
                public boolean onInfo(MediaPlayer mp, int what, int extra) {
                    /*
                     * add what == MediaPlayer.MEDIA_INFO_VIDEO_TRACK_LAGGING
                     * fix : return what == 700 in Lenovo low configuration Android System
                     */
                    if (what == MediaPlayer.MEDIA_INFO_VIDEO_RENDERING_START
                            || what == MediaPlayer.MEDIA_INFO_VIDEO_TRACK_LAGGING) {
                        mProgressBarView.setVisibility(View.GONE);
                        setCloseButton(true);
                        return true;
                    }
                    return false;
                }
            });

        }
    };

    private MediaPlayer.OnCompletionListener mOnCompletionListener = new MediaPlayer.OnCompletionListener() {
        @Override
        public void onCompletion(MediaPlayer mediaPlayer) {

            Toast.makeText(mContext, "视频播放完成", Toast.LENGTH_SHORT).show();
        }
    };
    public void pausePlay(boolean isShowController) {
        mSuperVideoView.pause();
        mVideoController.setPlayState(VideoController.PlayState.PAUSE);

    }

    /***
     * 继续播放
     */
    public void goOnPlay() {
        mSuperVideoView.start();
        mVideoController.setPlayState(VideoController.PlayState.PLAY);
        resetUpdateTimer();
    }
    /***
     *设置关闭按钮可见性
    */
    private void setCloseButton(boolean isShow) {
        mCloseBtnView.setVisibility(isShow ? VISIBLE : INVISIBLE);
    }
    /**
     * 更新播放的进度时间
     */
    private void updatePlayTime() {
        int allTime = mSuperVideoView.getDuration();
        int playTime = mSuperVideoView.getCurrentPosition();
        mVideoController.setPlayProgressTxt(playTime, allTime);
    }
    /**
     * 更新播放进度条
     */
    private void updatePlayProgress() {
        int allTime = mSuperVideoView.getDuration();
        int playTime = mSuperVideoView.getCurrentPosition();
        int loadProgress = mSuperVideoView.getBufferPercentage();
        int progress = playTime * 100 / allTime;
        mVideoController.setProgressBar(progress, loadProgress);
    }
    /**
     * 显示loading圈
     *
     * @param isTransparentBg isTransparentBg
     */
    private void showProgressView(Boolean isTransparentBg) {
        mProgressBarView.setVisibility(VISIBLE);
        if (!isTransparentBg) {
            mProgressBarView.setBackgroundResource(android.R.color.black);
        } else {
            mProgressBarView.setBackgroundResource(android.R.color.transparent);
        }
    }
    /**
     * 关闭视频
     */
    public void close() {
        mVideoController.setPlayState(VideoController.PlayState.PAUSE);
        mSuperVideoView.pause();
        mSuperVideoView.stopPlayback();
        mSuperVideoView.setVisibility(GONE);
        stopUpdateTimer();
    }
    private void initView(Context context) {
        mContext = context;
        View.inflate(context, R.layout.video_player, this);
        mSuperVideoView = (SuperVideoView) findViewById(R.id.video_view);
        mVideoController = (VideoController) findViewById(R.id.controller);
        mProgressBarView = findViewById(R.id.progressbar);
        mCloseBtnView = findViewById(R.id.video_close_view);


        mVideoController.setMediaControl(mVideoControl);
        mSuperVideoView.setOnTouchListener(mOnTouchVideoListener);

        setCloseButton(false);
        showProgressView(false);


        mCloseBtnView.setOnClickListener(mOnClickListener);
        mProgressBarView.setOnClickListener(mOnClickListener);

    }

    public void setPageType(VideoController.PageType pageType) {
        mVideoController.setPageType(pageType);
        mCurrPageType = pageType;
    }
    /**
     * 加载并开始播放视频
     *
     * @param videoUrl videoUrl
     */
    public void loadAndPlay(Uri videoUrl, int seekTime) {
        showProgressView(seekTime > 0);
        setCloseButton(true);
        if (TextUtils.isEmpty(videoUrl.toString())) {
            Log.e("TAG", "videoUrl should not be null");
            return;
        }
        mSuperVideoView.setOnPreparedListener(mOnPreparedListener);
        //if (videoUrl.isOnlineVideo()) {
            //mSuperVideoView.setVideoPath(videoUrl.getFormatUrl());
        //} else {
            //Uri uri = Uri.parse(videoUrl.getFormatUrl());
            mSuperVideoView.setVideoURI(videoUrl);
       // }
        mSuperVideoView.setVisibility(VISIBLE);
        startPlayVideo(seekTime);
    }

    /**
     * 播放视频
     * should called after setVideoPath()
     */
    private void startPlayVideo(int seekTime) {
        if (null == mUpdateTimer) resetUpdateTimer();
        mSuperVideoView.setOnCompletionListener(mOnCompletionListener);
        mSuperVideoView.start();
        if (seekTime > 0) {
            mSuperVideoView.seekTo(seekTime);
        }
        mVideoController.setPlayState(VideoController.PlayState.PLAY);
    }

    private View.OnClickListener mOnClickListener = new OnClickListener() {
        @Override
        public void onClick(View view) {
            if (view.getId() == R.id.video_close_view) {
                mVideoPlayCallback.onCloseVideo();
            }
        }
    };

    private View.OnTouchListener mOnTouchVideoListener = new OnTouchListener() {
        @Override
        public boolean onTouch(View view, MotionEvent motionEvent) {
            if (motionEvent.getAction() == MotionEvent.ACTION_DOWN) {
                //showOrHideController();
            }
            return mCurrPageType == VideoController.PageType.EXPAND;
        }
    };


}
