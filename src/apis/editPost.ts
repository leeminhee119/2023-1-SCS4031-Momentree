import { PATCH } from 'apis/api';
import { DELETE } from 'apis/api';
import { IEditMainPost } from 'types/editPost';
import { IEditPlaceOrder } from 'types/editPost';
import { IEditPlaceContent } from 'types/editPost';
import { IRecordedPlace } from 'types/post';

// 게시글 본문 수정 (제목, 데이트날짜, 전체후기)
export const editPostMain = async (postId: number, body: IEditMainPost, token: string) => {
  const { data } = await PATCH(`/community/${postId}`, body, token);
  return data;
};

// 장소 순서 수정
export const editPostPlaceOrder = async (postId: number, body: IEditPlaceOrder, token: string) => {
  const { data } = await PATCH(`/community/${postId}/orderChange`, body, token);
  return data;
};

// 장소 세부 후기 수정
export const editPostPlaceContent = async (postId: number, body: IEditPlaceContent[], token: string) => {
  const { data } = await PATCH(`/community/${postId}/placeContentChange`, body, token);
  return data;
};

// 장소 삭제
export const editPostDeletePlace = async (postId: number, token: string) => {
  const { data } = await DELETE(`/deletePlace/${postId}`, token);
  return data;
};

// 장소 추가
export const editPostAddPlace = async (postId: number, body: IRecordedPlace, token: string) => {
  const { data } = await PATCH(`/community/${postId}/addPlace`, body, token);
  return data;
};
