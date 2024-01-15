import { createCourse } from "../api";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
    Wrap,
    WrapItem
} from "@chakra-ui/react";

import Select from "react-select";

const options = [
    {
        label: "Beginner",
        value: 0
    },
    {
        label: "Intermediate",
        value: 1
    },
    {
        label: "Advanced",
        value: 2
    }
];

function CreateCourses() {
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [banner, setBanner] = useState({ data: null, url: null });
    let [sourceName, setSourceName] = useState("");
    let [sourceUrl, setSourceUrl] = useState("");
    let [price, setPrice] = useState(0);
    let [isCertified, setCertified] = useState('0');
    let [rating, setRating] = useState(1);
    let [level, setLevel] = useState({ label: "Beginner", value: 0 });
    let [startTimestamp, setStartTimestamp] = useState(Date.now());
    let [endTimestamp, setEndTimestamp] = useState(null);
    let [loading, setLoading] = useState(false);

    let [keyword, setKeyword] = useState("");
    let [keywords, setKeywords] = useState([]);
    let navigate = useNavigate();

    const handleSubmit = async() => {
        if(loading) return;
        if(!title.length) return;
        if(!description.length) return;
        if(!banner.data) return;
        if(!sourceName.length) return;
        if(!sourceUrl.length) return;

        setLoading(true);
        try {
            let data = new FormData();
            let body = {
                title,
                description,
                source: {
                    name: sourceName,
                    url: sourceUrl
                },
                price,
                is_certified: isCertified === "1",
                rating,
                level,
                date: {
                    start_timestamp: startTimestamp,
                    end_timestamp: endTimestamp
                },
                keywords
            }
            data.append("payload_json", JSON.stringify(body));
            if(banner.data) data.append("banner", banner.data);
            await createCourse(data);
            navigate("/admin/courses");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Box>
            <Box my={10}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Short Description</FormLabel>
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        resize="none"
                    />
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Source</FormLabel>
                    <HStack>
                        <Input
                            type="text"
                            placeholder="Name"
                            value={sourceName}
                            onChange={(e) => setSourceName(e.target.value)}
                        />
                        <Input
                            type="url"
                            placeholder="Url"
                            value={sourceUrl}
                            onChange={(e) => setSourceUrl(e.target.value)}
                        />
                    </HStack>
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Price</FormLabel>
                    <NumberInput
                        precision={2}
                        step={0.02}
                        value={price}
                        onChange={(value) => setPrice(parseInt(value))}
                        w="100%"
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Rating</FormLabel>
                    <NumberInput
                        value={rating}
                        onChange={(value) => setRating(parseInt(value))}
                        w="100%"
                        max={5}
                        min={1}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Level</FormLabel>
                    <Select
                        value={level}
                        onChange={setLevel}
                        options={options}
                        styles={{
                            option: () => {
                                return {
                                    color: "black"
                                }
                            }
                        }}
                    />
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Keywords</FormLabel>
                    <Input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if(!keyword.length) return;
                            if(e.key.toLowerCase() !== "enter") return;

                            setKeyword("");
                            setKeywords(keys => [...keys, keyword.toLowerCase()]);
                        }}
                    />
                    {
                        keywords.length
                        ? (
                            <Box border="solid gray 0.1px" borderRadius="5px" p={1} mt={2}>
                                <Wrap>
                                    {keywords.map((key, index) =>
                                        <WrapItem key={index}>
                                            <Box
                                                cursor="pointer"
                                                border="solid gray 0.1px"
                                                onClick={() => {
                                                    let new_keywords = [...keywords];
                                                    let index = new_keywords.indexOf(key);
                                                    if(new_keywords[index]) new_keywords.splice(index, 1);
                                                    setKeywords(new_keywords);
                                                }}
                                                p="0.1px"
                                            >
                                                {key}
                                            </Box>
                                        </WrapItem>
                                    )}
                                </Wrap>
                            </Box>
                        )
                        : ""
                    }
                </FormControl>
                <FormControl>
                    <FormLabel>Date</FormLabel>
                    <HStack>
                        <Input
                            placeholder="Start At"
                            type="datetime-local"
                            value={
                                new Date(startTimestamp).getFullYear()
                                + "-"
                                + new Date(startTimestamp).getMonth()+1
                                + "-"
                                + new Date(startTimestamp).getDate()
                                + "T"
                                + (new Date(startTimestamp).getHours() < 10 ? "0" + new Date(startTimestamp).getHours() : new Date(startTimestamp).getHours())
                                + ":"
                                + (new Date(startTimestamp).getMinutes() < 10 ? "0" + new Date(startTimestamp).getMinutes() : new Date(startTimestamp).getMinutes())
                            }
                            onChange={(e) => setStartTimestamp(e.target.valueAsNumber)}
                        />
                        <Input
                            placeholder="End At"
                            type="datetime-local"
                            value={
                                new Date(endTimestamp).getFullYear()
                                + "-"
                                + new Date(endTimestamp).getMonth()+1
                                + "-"
                                + new Date(endTimestamp).getDate()
                                + "T"
                                + (new Date(endTimestamp).getHours() < 10 ? "0" + new Date(endTimestamp).getHours() : new Date(endTimestamp).getHours())
                                + ":"
                                + (new Date(endTimestamp).getMinutes() < 10 ? "0" + new Date(endTimestamp).getMinutes() : new Date(endTimestamp).getMinutes())
                            }
                            onChange={(e) => setEndTimestamp(e.target.valueAsNumber)}
                        />
                    </HStack>
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>{banner.data?.name || "Upload Banner"}</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            let regex = /^(blob?:)?(https?:\/\/)?.+$/gi;
                            if(banner.data && regex.test(banner.url)) URL.revokeObjectURL(banner.url);
                            setBanner({ data: e.target.files[0], url: URL.createObjectURL(e.target.files[0]) });
                        }}
                    />
                </FormControl>
                <FormControl mt={5}>
                    <FormLabel>Is this course certified?</FormLabel>
                    <RadioGroup onChange={setCertified} value={isCertified}>
                        <Stack direction='row'>
                            <Radio value='1'>Yes</Radio>
                            <Radio value='0'>No</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <ButtonGroup mt={5}>
                    <Button
                        colorScheme="red"
                        isLoading={loading}
                        loadingText="Submitting"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
}

function Courses() {
    let navigate = useNavigate();
    let { pathname } = useLocation();
    let { typeOrId } = useParams();
    let [page, setPage] = useState("");

    useEffect(() => {
        const initialize = () => {
            setPage(typeOrId || "dashboard");
        }
        initialize();
    }, [typeOrId]);

    return (
        <Container maxW="container.xl">
            <Heading my={10}>
                Manage Courses
            </Heading>
            {
                page === "dashboard"
                ? (
                    <>
                        <ButtonGroup>
                            <Button
                                leftIcon={<AddIcon />}
                                colorScheme="red"
                                onClick={() => navigate(pathname + "/create")}
                            >
                                CREATE
                            </Button>
                        </ButtonGroup>
                    </>
                )
                : page === "create"
                ? <CreateCourses />
                : ""
            }
        </Container>
    );
}

export default Courses;