import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


interface ProfileAnalyticsProps { 
    height: any 
    onClickDatapoint?: Function
}
interface ProfileAnalyticsState { data: any[] }

class ProfileAnalyticsChart extends Component<ProfileAnalyticsProps, ProfileAnalyticsState> {

    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    "id": "Jordan",
                    "color": "hsl(87, 70%, 50%)",
                    "data": [
                        {
                            "images": [
                                {
                                    "path_in_s3": '',
                                    "timestamp": "",
                                    "camera_id": ""
                                }
                            ],
                            "x": "Week 1 (4 Sept)",
                            "y": 0
                        },
                        {
                            "x": "Week 2 (11 Sept)",
                            "y": 190
                        },
                        {
                            "x": "Week 3 (18 Sept)",
                            "y": 105
                        },
                        {
                            "x": "train",
                            "y": 27
                        },
                        {
                            "x": "subway",
                            "y": 238
                        },
                        {
                            "x": "bus",
                            "y": 58
                        },
                        {
                            "x": "car",
                            "y": 229
                        },
                        {
                            "x": "moto",
                            "y": 95
                        },
                        {
                            "x": "bicycle",
                            "y": 251
                        },
                        {
                            "x": "horse",
                            "y": 94
                        },
                        {
                            "x": "skateboard",
                            "y": 26
                        },
                        {
                            "x": "others",
                            "y": 270
                        }
                    ]
                },
                {
                    "id": "Churchill",
                    "color": "hsl(331, 70%, 50%)",
                    "data": [
                        {
                            "x": "Week 1 (4 Sept)",
                            "y": 240
                        },
                        {
                            "x": "Week 2 (11 Sept)",
                            "y": 213
                        },
                        {
                            "x": "Week 3 (18 Sept)",
                            "y": 108
                        },
                        {
                            "x": "train",
                            "y": 136
                        },
                        {
                            "x": "subway",
                            "y": 128
                        },
                        {
                            "x": "bus",
                            "y": 12
                        },
                        {
                            "x": "car",
                            "y": 221
                        },
                        {
                            "x": "moto",
                            "y": 287
                        },
                        {
                            "x": "bicycle",
                            "y": 174
                        },
                        {
                            "x": "horse",
                            "y": 205
                        },
                        {
                            "x": "skateboard",
                            "y": 150
                        },
                        {
                            "x": "others",
                            "y": 215
                        }
                    ]
                },
                {
                    "id": "Luqmaan",
                    "color": "hsl(338, 70%, 50%)",
                    "data": [
                        {
                            "x": "Week 1 (4 Sept)",
                            "y": 172
                        },
                        {
                            "x": "Week 2 (11 Sept)",
                            "y": 203
                        },
                        {
                            "x": "Week 3 (18 Sept)",
                            "y": 228
                        },
                        {
                            "x": "train",
                            "y": 1
                        },
                        {
                            "x": "subway",
                            "y": 295
                        },
                        {
                            "x": "bus",
                            "y": 46
                        },
                        {
                            "x": "car",
                            "y": 141
                        },
                        {
                            "x": "moto",
                            "y": 161
                        },
                        {
                            "x": "bicycle",
                            "y": 100
                        },
                        {
                            "x": "horse",
                            "y": 265
                        },
                        {
                            "x": "skateboard",
                            "y": 220
                        },
                        {
                            "x": "others",
                            "y": 126
                        }
                    ]
                }
                // {
                //     "id": "germany",
                //     "color": "hsl(20, 70%, 50%)",
                //     "data": [
                //         {
                //             "x": "Week 1 (4 Sept)",
                //             "y": 136
                //         },
                //         {
                //             "x": "Week 2 (11 Sept)",
                //             "y": 66
                //         },
                //         {
                //             "x": "Week 3 (18 Sept)",
                //             "y": 45
                //         },
                //         {
                //             "x": "train",
                //             "y": 109
                //         },
                //         {
                //             "x": "subway",
                //             "y": 148
                //         },
                //         {
                //             "x": "bus",
                //             "y": 90
                //         },
                //         {
                //             "x": "car",
                //             "y": 135
                //         },
                //         {
                //             "x": "moto",
                //             "y": 93
                //         },
                //         {
                //             "x": "bicycle",
                //             "y": 160
                //         },
                //         {
                //             "x": "horse",
                //             "y": 231
                //         },
                //         {
                //             "x": "skateboard",
                //             "y": 214
                //         },
                //         {
                //             "x": "others",
                //             "y": 288
                //         }
                //     ]
                // },
                // {
                //     "id": "norway",
                //     "color": "hsl(170, 70%, 50%)",
                //     "data": [
                //         {
                //             "x": "Week 1 (4 Sept)",
                //             "y": 14
                //         },
                //         {
                //             "x": "Week 2 (11 Sept)",
                //             "y": 53
                //         },
                //         {
                //             "x": "Week 3 (18 Sept)",
                //             "y": 232
                //         },
                //         {
                //             "x": "train",
                //             "y": 15
                //         },
                //         {
                //             "x": "subway",
                //             "y": 209
                //         },
                //         {
                //             "x": "bus",
                //             "y": 155
                //         },
                //         {
                //             "x": "car",
                //             "y": 262
                //         },
                //         {
                //             "x": "moto",
                //             "y": 211
                //         },
                //         {
                //             "x": "bicycle",
                //             "y": 264
                //         },
                //         {
                //             "x": "horse",
                //             "y": 295
                //         },
                //         {
                //             "x": "skateboard",
                //             "y": 129
                //         },
                //         {
                //             "x": "others",
                //             "y": 207
                //         }
                //     ]
                // }
            ]
        }

        this.onClickDatapoint = this.onClickDatapoint.bind(this)

    }

    onClickDatapoint = (e) => {
        this.props.onClickDatapoint? this.props.onClickDatapoint(e): console.log(e)
    }


    componentDidMount = () => {
        console.log("MOUNTED");
        console.log(this.props.height);

    }

    render() {
        return (
            <div style={{ backgroundColor: 'white', height: this.props.height }}>
                <ResponsiveLine
                    onClick={this.onClickDatapoint}
                    data={this.state.data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    curve='natural'
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'transportation',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'nivo' }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />

            </div>

        )

    }
}

export default ProfileAnalyticsChart;