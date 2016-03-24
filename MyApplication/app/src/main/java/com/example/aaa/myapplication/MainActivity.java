/*
 * Copyright (C) 2012 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.example.aaa.myapplication;

import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.os.Bundle;
import android.net.Uri;
import android.view.View;
import android.support.v7.app.AppCompatActivity;
import android.view.WindowManager;

import com.example.aaa.myapplication.view.VideoController;
import com.example.aaa.myapplication.view.VideoPlayer;
import com.facebook.stetho.Stetho;

public class MainActivity  extends AppCompatActivity implements View.OnClickListener{
    private  VideoPlayer mVideoPlayer;
    private View mPlayBtnView;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Stetho.initializeWithDefaults(this);
        setContentView(R.layout.activity_main);
        mVideoPlayer = (VideoPlayer) findViewById(R.id.video_player_item_1);
        mPlayBtnView = findViewById(R.id.play_btn);
        mPlayBtnView.setOnClickListener(this);

        mVideoPlayer.setVideoPlayCallback(mVideoPlayCallback);

    }
    @Override
    public void onClick(View view) {
        mPlayBtnView.setVisibility(View.GONE);
        mVideoPlayer.setVisibility(View.VISIBLE);

        String vidAddress = "http://vfx.mtime.cn/Video/2016/03/11/mp4/160311074532237733.mp4";
        Uri vidUri = Uri.parse(vidAddress);
        mVideoPlayer.loadAndPlay(vidUri, 0);

    }
    private VideoPlayer.VideoPlayCallbackImpl mVideoPlayCallback = new VideoPlayer.VideoPlayCallbackImpl() {
        @Override
        public void onCloseVideo() {
            mVideoPlayer.close();
            mPlayBtnView.setVisibility(View.VISIBLE);
            mVideoPlayer.setVisibility(View.GONE);
            resetPageToPortrait();
        }

        @Override
        public void onSwitchPageType() {
            if (getRequestedOrientation() == ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE) {
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                mVideoPlayer.setPageType(VideoController.PageType.SHRINK);
            } else {
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                mVideoPlayer.setPageType(VideoController.PageType.EXPAND);
            }
        }

        @Override
        public void onPlayFinish() {

        }
    };
    /***
     * 恢复屏幕至竖屏
     */
    private void resetPageToPortrait() {
        if (getRequestedOrientation() == ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            mVideoPlayer.setPageType(VideoController.PageType.SHRINK);
        }
    }
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        if (null == mVideoPlayer) return;
        if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
            getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                    WindowManager.LayoutParams.FLAG_FULLSCREEN);
            getWindow().getDecorView().invalidate();
            float height = DensityUtil.getWidthInPx(this);
            float width = DensityUtil.getHeightInPx(this);
            mVideoPlayer.getLayoutParams().height = (int) width;
            mVideoPlayer.getLayoutParams().width = (int) height;
        }


    }
    @Override
    public void onSaveInstanceState(Bundle outState){
        super.onSaveInstanceState(outState);
    }
}