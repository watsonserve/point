import accessInterface from "@/utils/dataInterface";

export function getSpaces() {
    return accessInterface({
        url: '/spaces.json'
    });
}

export function getSpaceById(spaceId) {
    return accessInterface({
        url: '/space.json',
        params: {
            spaceId
        }
    });
}
