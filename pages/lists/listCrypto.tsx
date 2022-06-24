import * as React from "react";
import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Slide from "@mui/material/Slide";
import listCryptoStyles from "./listCrypto.module.css";
import LoaderSpinner from "../../status/loading";
import Error from "../../status/error";
import ListCryptoTitle from "./listCryptoTitle";
import lightThemeOptions from "../../styles/theme/lightThemeOptions";
import { Service } from "../../types/service";
import { ExpandCardByIndex } from "../../types/expandCardByIndex";
import useCryptoCoinService, { CryptoCoins } from "../api/useCryptoCoinService";

const textSecondary = lightThemeOptions.palette.text.secondary;

const ListCrypto: NextPage<{}> = () => {
    // fetchData on mount
    const service = useCryptoCoinService();

    // fetchData on button click
    const [result, setResult] = useState<Service<CryptoCoins>>();

    const fetchData = async () => {
        try {
            setResult({ status: "loading" });
            const response = await (
                await fetch("https://api.coincap.io/v2/assets?limit=7")
            ).json();
            setResult({
                status: "loaded",
                payload: response,
            });
        } catch (error: any) {
            setResult({ status: "error", error });
        }
    };

    const handleClick = (event: any) => {
        event.preventDefault();
        setExpand((expand = {}));
        setResult({ status: "init" });
        fetchData();
    };

    // expand cards
    let [expand, setExpand] = useState<ExpandCardByIndex>({});
    const handleExpandClick = (i: number) => {
        if (expand[i]) {
            setExpand({ ...expand, [i]: !expand[i] });
        } else {
            setExpand((expand = {}));
            setExpand({ ...expand, [i]: !expand[i] });
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ButtonGroup
                className={listCryptoStyles.buttonGroup}
                aria-label="large button group"
            >
                <Button
                    id={listCryptoStyles.button}
                    variant="outlined"
                    key="one"
                    onClick={handleClick}
                >
                    TOP 3 COINS
                </Button>

                <Button
                    id={listCryptoStyles.button}
                    variant="outlined"
                    key="two"
                    onClick={handleClick}
                >
                    FLOP 3 COINS
                </Button>
            </ButtonGroup>

            <ListCryptoTitle />

            {!result
                ? service && service.status === "loading" && <LoaderSpinner />
                : result.status === "loading" && <LoaderSpinner />}

            {!result
                ? service &&
                  service.status === "loaded" &&
                  service.payload.data.map((cryptocoin, index: number) => (
                      <Grid
                          container
                          spacing={"16px"}
                          justifyContent="center"
                          alignItems="center"
                          key={index}
                          sx={{
                              marginBottom: "16px",
                          }}
                      >
                          <Grid
                              container
                              justifyContent="center"
                              item
                              xs={12}
                              md={10}
                          >
                              <Slide
                                  direction={
                                      cryptocoin.rank % 2 == 0
                                          ? "left"
                                          : "right"
                                  }
                                  timeout={Number(cryptocoin.rank + 1) * 35}
                                  in={true}
                                  mountOnEnter
                                  unmountOnExit
                              >
                                  <Card
                                      elevation={1}
                                      className={
                                          !expand[index]
                                              ? listCryptoStyles.card
                                              : `${listCryptoStyles.card} ${listCryptoStyles.cardExpanded}`
                                      }
                                      sx={[
                                          {
                                              "&:hover": {
                                                  background:
                                                      "linear-gradient(0deg, rgba(63, 81, 181, 0.08), rgba(63, 81, 181, 0.08)), #FFFFFF;",
                                                  cursor: "pointer",
                                              },
                                          },
                                      ]}
                                      onClick={() => handleExpandClick(index)}
                                  >
                                      <CardContent
                                          className={
                                              listCryptoStyles.cardContent1
                                          }
                                      >
                                          <Avatar
                                              alt={`${"bitcoin"}`}
                                              sx={{
                                                  background: `url("/images/${cryptocoin.name.toLowerCase()}.png")`,
                                                  backgroundPosition: "center",
                                                  backgroundSize: "40px 40px",
                                                  backgroundRepeat: "no-repeat",
                                              }}
                                              id={listCryptoStyles.cardAvatar}
                                          />
                                          <Typography
                                              id={listCryptoStyles.cardName}
                                          >
                                              {cryptocoin.name}
                                          </Typography>

                                          <Typography
                                              id={listCryptoStyles.cardPrice}
                                              color={textSecondary}
                                              variant="body2"
                                          >
                                              {new Intl.NumberFormat("en-US", {
                                                  style: "currency",
                                                  currency: "USD",
                                              }).format(cryptocoin.priceUsd)}
                                          </Typography>
                                          <Typography
                                              variant="body2"
                                              className={
                                                  Math.sign(
                                                      cryptocoin.changePercent24Hr
                                                  ) > 0
                                                      ? listCryptoStyles.cardChange
                                                      : `${listCryptoStyles.cardChange} ${listCryptoStyles.cardChangeNegative}`
                                              }
                                          >
                                              {Math.sign(
                                                  cryptocoin.changePercent24Hr
                                              ) > 0
                                                  ? cryptocoin.changePercent24Hr
                                                        .toString()
                                                        .charAt(0) === "0"
                                                      ? new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                style: "percent",
                                                                maximumSignificantDigits: 1,
                                                            }
                                                        ).format(
                                                            cryptocoin.changePercent24Hr /
                                                                100
                                                        )
                                                      : new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                style: "percent",
                                                                maximumSignificantDigits: 3,
                                                            }
                                                        ).format(
                                                            cryptocoin.changePercent24Hr /
                                                                100
                                                        )
                                                  : cryptocoin.changePercent24Hr
                                                        .toString()
                                                        .charAt(1) === "0"
                                                  ? new Intl.NumberFormat(
                                                        "en-US",
                                                        {
                                                            style: "percent",
                                                            maximumSignificantDigits: 1,
                                                        }
                                                    ).format(
                                                        cryptocoin.changePercent24Hr /
                                                            100
                                                    )
                                                  : new Intl.NumberFormat(
                                                        "en-US",
                                                        {
                                                            style: "percent",
                                                            maximumSignificantDigits: 3,
                                                        }
                                                    ).format(
                                                        cryptocoin.changePercent24Hr /
                                                            100
                                                    )}
                                          </Typography>
                                      </CardContent>

                                      <Collapse
                                          in={expand[index]}
                                          timeout="auto"
                                          unmountOnExit
                                      >
                                          <CardContent
                                              className={
                                                  listCryptoStyles.cardContent2
                                              }
                                          >
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent2Text
                                                  }
                                              >
                                                  High
                                              </Typography>
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent2Text
                                                  }
                                              >
                                                  Low
                                              </Typography>
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent2Text
                                                  }
                                              >
                                                  Average
                                              </Typography>
                                          </CardContent>
                                          <CardContent
                                              className={
                                                  listCryptoStyles.cardContent2
                                              }
                                          >
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent3Text
                                                  }
                                              >
                                                  $2,848.57
                                              </Typography>
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent3Text
                                                  }
                                              >
                                                  $2,589.00
                                              </Typography>
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent3Text
                                                  }
                                              >
                                                  {new Intl.NumberFormat(
                                                      "en-US",
                                                      {
                                                          style: "currency",
                                                          currency: "USD",
                                                      }
                                                  ).format(cryptocoin.vwap24Hr)}
                                              </Typography>
                                          </CardContent>
                                      </Collapse>
                                  </Card>
                              </Slide>
                          </Grid>
                      </Grid>
                  ))
                : result &&
                  result.status === "loaded" &&
                  result.payload.data.map((cryptocoin, index: number) => (
                      <Grid
                          container
                          spacing={"16px"}
                          justifyContent="center"
                          alignItems="center"
                          key={index}
                          sx={{
                              marginBottom: "16px",
                          }}
                      >
                          <Grid
                              container
                              justifyContent="center"
                              item
                              xs={12}
                              md={10}
                          >
                              <Slide
                                  in={true}
                                  mountOnEnter
                                  unmountOnExit
                                  direction={
                                      cryptocoin.rank % 2 == 0 ? "down" : "up"
                                  }
                                  timeout={Number(cryptocoin.rank + 1) * 25}
                              >
                                  <Card
                                      elevation={1}
                                      className={
                                          !expand[index]
                                              ? listCryptoStyles.card
                                              : `${listCryptoStyles.card} ${listCryptoStyles.cardExpanded}`
                                      }
                                      sx={[
                                          {
                                              "&:hover": {
                                                  background:
                                                      "linear-gradient(0deg, rgba(63, 81, 181, 0.08), rgba(63, 81, 181, 0.08)), #FFFFFF;",
                                                  cursor: "pointer",
                                              },
                                          },
                                      ]}
                                      onClick={() => handleExpandClick(index)}
                                  >
                                      <CardContent
                                          className={
                                              listCryptoStyles.cardContent1
                                          }
                                      >
                                          <Avatar
                                              alt={`${"bitcoin"}`}
                                              sx={{
                                                  background: `url("/images/${cryptocoin.name.toLowerCase()}.png")`,
                                                  backgroundPosition: "center",
                                                  backgroundSize: "40px 40px",
                                                  backgroundRepeat: "no-repeat",
                                              }}
                                              id={listCryptoStyles.cardAvatar}
                                          />
                                          <Typography
                                              id={listCryptoStyles.cardName}
                                          >
                                              {cryptocoin.name}
                                          </Typography>

                                          <Typography
                                              id={listCryptoStyles.cardPrice}
                                              color={textSecondary}
                                              variant="body2"
                                          >
                                              {new Intl.NumberFormat("en-US", {
                                                  style: "currency",
                                                  currency: "USD",
                                              }).format(cryptocoin.priceUsd)}
                                          </Typography>
                                          <Typography
                                              variant="body2"
                                              className={
                                                  Math.sign(
                                                      cryptocoin.changePercent24Hr
                                                  ) > 0
                                                      ? listCryptoStyles.cardChange
                                                      : `${listCryptoStyles.cardChange} ${listCryptoStyles.cardChangeNegative}`
                                              }
                                          >
                                              {Math.sign(
                                                  cryptocoin.changePercent24Hr
                                              ) > 0
                                                  ? cryptocoin.changePercent24Hr
                                                        .toString()
                                                        .charAt(0) === "0"
                                                      ? new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                style: "percent",
                                                                maximumSignificantDigits: 2,
                                                            }
                                                        ).format(
                                                            cryptocoin.changePercent24Hr /
                                                                100
                                                        )
                                                      : new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                style: "percent",
                                                                maximumSignificantDigits: 3,
                                                            }
                                                        ).format(
                                                            cryptocoin.changePercent24Hr /
                                                                100
                                                        )
                                                  : cryptocoin.changePercent24Hr
                                                        .toString()
                                                        .charAt(1) === "0"
                                                  ? new Intl.NumberFormat(
                                                        "en-US",
                                                        {
                                                            style: "percent",
                                                            maximumSignificantDigits: 1,
                                                        }
                                                    ).format(
                                                        cryptocoin.changePercent24Hr /
                                                            100
                                                    )
                                                  : new Intl.NumberFormat(
                                                        "en-US",
                                                        {
                                                            style: "percent",
                                                            maximumSignificantDigits: 3,
                                                        }
                                                    ).format(
                                                        cryptocoin.changePercent24Hr /
                                                            100
                                                    )}
                                          </Typography>
                                      </CardContent>

                                      <Collapse
                                          in={expand[index]}
                                          timeout="auto"
                                          unmountOnExit
                                      >
                                          <CardContent
                                              className={
                                                  listCryptoStyles.cardContent2
                                              }
                                          >
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent2Text
                                                  }
                                              >
                                                  High
                                              </Typography>
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent2Text
                                                  }
                                              >
                                                  Low
                                              </Typography>
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent2Text
                                                  }
                                              >
                                                  Average
                                              </Typography>
                                          </CardContent>
                                          <CardContent
                                              className={
                                                  listCryptoStyles.cardContent2
                                              }
                                          >
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent3Text
                                                  }
                                              >
                                                  {new Intl.NumberFormat(
                                                      "en-US",
                                                      {
                                                          style: "currency",
                                                          currency: "USD",
                                                      }
                                                  ).format(
                                                      cryptocoin.vwap24Hr * 1.5
                                                  )}
                                              </Typography>
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent3Text
                                                  }
                                              >
                                                  {new Intl.NumberFormat(
                                                      "en-US",
                                                      {
                                                          style: "currency",
                                                          currency: "USD",
                                                      }
                                                  ).format(
                                                      cryptocoin.vwap24Hr / 1.5
                                                  )}
                                              </Typography>
                                              <Typography
                                                  id={
                                                      listCryptoStyles.cardContent3Text
                                                  }
                                              >
                                                  {new Intl.NumberFormat(
                                                      "en-US",
                                                      {
                                                          style: "currency",
                                                          currency: "USD",
                                                      }
                                                  ).format(cryptocoin.vwap24Hr)}
                                              </Typography>
                                          </CardContent>
                                      </Collapse>
                                  </Card>
                              </Slide>
                          </Grid>
                      </Grid>
                  ))}
            {!result
                ? service && service.status === "error" && <Error />
                : result.status === "error" && <Error />}
        </Box>
    );
};

export default ListCrypto;
